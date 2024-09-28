import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato
import ERC20ABI from './ERC20ABI.json'; // ABI padrão para tokens ERC20

const SubscriberSystem = () => {
    // Estados para armazenar informações do usuário e do contrato
    const [referralLink, setReferralLink] = useState('');
    const [account, setAccount] = useState('');
    const [referrer, setReferrer] = useState('');
    const [subscriberInfo, setSubscriberInfo] = useState(null);
    const [planId, setPlanId] = useState('');
    const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [planPrice, setPlanPrice] = useState(null);
    const [contractTokenBalance, setContractTokenBalance] = useState(null);
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Endereços dos contratos
    const contractAddress = '0x5f16FE1A416BB62548D37F02D2ceb4305FDD37A3'; // Endereço do contrato de gerenciamento de assinantes
    const rewardTokenAddress = '0x7129CaFA080583f2c173a6f09E6b5f383618d83D'; // Endereço do token de recompensa

    // Constantes do sistema
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const REWARD_AMOUNT = ethers.utils.parseUnits('10', 18); // Defina o valor de recompensa apropriado (ex: 10 tokens)
    const TRIAL_PERIOD = 7 * 24 * 60 * 60; // 7 dias em segundos

    // Função para verificar a rede atual
    const checkNetwork = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            if (network.chainId === 97) { // 97 é o chainId da BSC Testnet
                setIsCorrectNetwork(true);
                setErrorMessage('');
            } else {
                setIsCorrectNetwork(false);
                setErrorMessage('Por favor, conecte-se à BSC Testnet no MetaMask.');
            }
        } else {
            setErrorMessage('MetaMask não detectado!');
        }
    };

    // Chama checkNetwork ao carregar o componente e quando a rede muda
    useEffect(() => {
        checkNetwork();

        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                checkNetwork();
            });

            window.ethereum.on('accountsChanged', () => {
                connectWallet();
            });
        }

        // Verifica se a URL contém um parâmetro de referência
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref && ethers.utils.isAddress(ref)) {
            setReferrer(ref);
        }
    }, []);

    // Função para conectar a carteira MetaMask
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setErrorMessage("MetaMask não detectado!");
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);

            const currentChainId = (await provider.getNetwork()).chainId;
            if (currentChainId !== 97) { // 97 é o chainId da BSC Testnet
                setErrorMessage('Por favor, conecte-se à BSC Testnet no MetaMask.');
                setIsCorrectNetwork(false);
                return;
            } else {
                setIsCorrectNetwork(true);
                setErrorMessage('');
            }

            const generatedReferralLink = `${window.location.origin}/Subscriber?ref=${accounts[0]}`;
            setReferralLink(generatedReferralLink);

            // Instancia o contrato de gerenciamento de assinantes
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);

            // Obtém as informações do assinante
            const subscriber = await contract.getSubscriberInfo(accounts[0]);

            // Atualiza o estado com as informações do assinante
            setSubscriberInfo({
                ...subscriber,
                subscriptionExpiry: new Date(subscriber.subscriptionExpiry.toNumber() * 1000).toLocaleString(),
                reward: ethers.utils.formatUnits(subscriber.reward, 18) // Converte a recompensa para string legível
            });

            // Verifica o saldo do contrato
            await checkContractTokenBalance(provider);
        } catch (error) {
            console.error('Erro ao conectar a carteira:', error);
            setErrorMessage("Erro ao conectar carteira. Verifique se a MetaMask está instalada e configurada corretamente.");
        }
    };

    // Função para verificar o saldo de tokens do contrato
    const checkContractTokenBalance = async (providerInstance) => {
        try {
            const provider = providerInstance || new ethers.providers.Web3Provider(window.ethereum);
            const tokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, provider);
            const balance = await tokenContract.balanceOf(contractAddress);
            const formattedBalance = ethers.utils.formatUnits(balance, 18);
            setContractTokenBalance(formattedBalance);
        } catch (error) {
            console.error('Erro ao verificar o saldo do contrato:', error);
            setErrorMessage('Erro ao verificar o saldo do contrato.');
        }
    };

    // Função para obter o preço do plano
    const getPlanPrice = async (selectedPlanId) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, provider);
            const price = await contract.planPrices(selectedPlanId);

            // Converte o preço para uma string legível
            const formattedPrice = ethers.utils.formatUnits(price, 18);
            setPlanPrice(formattedPrice);

            // Retorna o BigNumber para uso nas transações
            return price;
        } catch (error) {
            console.error('Erro ao buscar preço do plano:', error);
            setErrorMessage('Erro ao buscar preço do plano.');
        }
    };

    // Função para registrar com referenciador
    const registerWithReferral = async () => {
        try {
            setErrorMessage('');
            setSuccess(null);

            if (!isCorrectNetwork) {
                setErrorMessage('Por favor, conecte-se à BSC Testnet no MetaMask.');
                return;
            }

            if (!window.ethereum) {
                setErrorMessage("MetaMask não detectado!");
                return;
            }

            if (referrer && !ethers.utils.isAddress(referrer)) {
                setErrorMessage('Endereço de referência inválido.');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);

            // Verifica se o usuário já está registrado
            const subscriber = await contract.getSubscriberInfo(account);
            if (subscriber.isRegistered) {
                setErrorMessage('Você já está registrado.');
                return;
            }

            // Se um referenciador é fornecido, verifique se está registrado e não é o próprio usuário
            let finalReferrer = ZERO_ADDRESS;
            if (referrer && referrer !== ZERO_ADDRESS) {
                if (referrer.toLowerCase() === account.toLowerCase()) {
                    setErrorMessage('Você não pode se referenciar a si mesmo.');
                    return;
                }

                const refSubscriber = await contract.getSubscriberInfo(referrer);
                if (!refSubscriber.isRegistered) {
                    setErrorMessage('Referenciador não está registrado.');
                    return;
                }

                finalReferrer = referrer;
            }

            // Verifica o saldo do contrato para recompensas
            const tokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, provider);
            const contractBalance = await tokenContract.balanceOf(contractAddress);
            if (contractBalance.lt(REWARD_AMOUNT)) {
                setErrorMessage('Saldo insuficiente no contrato para recompensas.');
                return;
            }

            setIsLoading(true);
            console.log(`Tentando registrar com referenciador: ${finalReferrer}`);

            // Chama a função register do contrato
            const tx = await contract.register(finalReferrer, {
                gasLimit: ethers.utils.hexlify(300000) // Ajuste conforme necessário
            });
            await tx.wait();

            setSuccess(true);
            setErrorMessage('');
            console.log('Registro bem-sucedido.');

            // Atualiza as informações do assinante e o saldo do contrato
            const updatedSubscriber = await contract.getSubscriberInfo(account);
            setSubscriberInfo({
                ...updatedSubscriber,
                subscriptionExpiry: new Date(updatedSubscriber.subscriptionExpiry.toNumber() * 1000).toLocaleString(),
                reward: ethers.utils.formatUnits(updatedSubscriber.reward, 18)
            });
            await checkContractTokenBalance(provider);
        } catch (error) {
            console.error('Erro ao registrar com referência:', error);
            setSuccess(false);
            // Tenta extrair a mensagem de erro do contrato, se disponível
            if (error.data && error.data.message) {
                setErrorMessage(error.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Falha ao registrar. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Função para registrar sem referenciador
    const registerWithoutReferral = async () => {
        try {
            setErrorMessage('');
            setSuccess(null);

            if (!isCorrectNetwork) {
                setErrorMessage('Por favor, conecte-se à BSC Testnet no MetaMask.');
                return;
            }

            if (!window.ethereum) {
                setErrorMessage("MetaMask não detectado!");
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);

            // Verifica se o usuário já está registrado
            const subscriber = await contract.getSubscriberInfo(account);
            if (subscriber.isRegistered) {
                setErrorMessage('Você já está registrado.');
                return;
            }

            // Verifica o saldo do contrato para recompensas
            const tokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, provider);
            const contractBalance = await tokenContract.balanceOf(contractAddress);
            if (contractBalance.lt(REWARD_AMOUNT)) {
                setErrorMessage('Saldo insuficiente no contrato para recompensas.');
                return;
            }

            setIsLoading(true);
            console.log('Tentando registrar sem referenciador.');

            // Chama a função register do contrato com o endereço zero
            const tx = await contract.register(ZERO_ADDRESS, {
                gasLimit: ethers.utils.hexlify(300000) // Ajuste conforme necessário
            });
            await tx.wait();

            setSuccess(true);
            setErrorMessage('');
            console.log('Registro sem referenciador bem-sucedido.');

            // Atualiza as informações do assinante e o saldo do contrato
            const updatedSubscriber = await contract.getSubscriberInfo(account);
            setSubscriberInfo({
                ...updatedSubscriber,
                subscriptionExpiry: new Date(updatedSubscriber.subscriptionExpiry.toNumber() * 1000).toLocaleString(),
                reward: ethers.utils.formatUnits(updatedSubscriber.reward, 18)
            });
            await checkContractTokenBalance(provider);
        } catch (error) {
            console.error('Erro ao registrar sem referência:', error);
            setSuccess(false);
            // Tenta extrair a mensagem de erro do contrato, se disponível
            if (error.data && error.data.message) {
                setErrorMessage(error.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Falha ao registrar. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Função para renovar a assinatura
    const renewSubscription = async () => {
        try {
            setErrorMessage('');
            setSuccess(null);

            if (!isCorrectNetwork) {
                setErrorMessage('Por favor, conecte-se à BSC Testnet no MetaMask.');
                return;
            }

            if (!window.ethereum) {
                setErrorMessage("MetaMask não detectado!");
                return;
            }

            if (!planId) {
                setErrorMessage('Por favor, selecione um plano.');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);

            // Aprova o contrato para gastar os tokens
            const tokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, signer);
            const planPriceBigNumber = await getPlanPrice(planId);

            if (!planPriceBigNumber || planPriceBigNumber.lte(0)) {
                setErrorMessage('O preço do plano é inválido.');
                return;
            }

            // Verifica o saldo do usuário
            const userBalance = await tokenContract.balanceOf(account);
            if (userBalance.lt(planPriceBigNumber)) {
                setErrorMessage('Saldo insuficiente para renovar a assinatura.');
                return;
            }

            setIsLoading(true);
            console.log(`Aprovando ${ethers.utils.formatUnits(planPriceBigNumber, 18)} tokens para o contrato.`);

            // Aprova o contrato para gastar os tokens do usuário
            const approveTx = await tokenContract.approve(contractAddress, planPriceBigNumber);
            await approveTx.wait();

            console.log('Aprovação concluída. Renovando a assinatura.');

            // Renova a assinatura após a aprovação
            const tx = await contract.renewSubscription(planId, {
                gasLimit: ethers.utils.hexlify(300000) // Ajuste conforme necessário
            });
            await tx.wait();

            setSuccess(true);
            setErrorMessage('');
            console.log('Renovação da assinatura bem-sucedida.');
        } catch (error) {
            console.error('Erro ao renovar a assinatura:', error);
            setSuccess(false);
            // Tenta extrair a mensagem de erro do contrato, se disponível
            if (error.data && error.data.message) {
                setErrorMessage(error.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Falha ao renovar assinatura. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Sistema de Assinantes</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {success && <p style={styles.success}>Operação realizada com sucesso!</p>}
            <button style={styles.button} onClick={connectWallet}>
                {account ? 'Carteira Conectada' : 'Conectar Carteira'}
            </button>
            {account && (
                <div style={styles.infoContainer}>
                    <p><strong>Conta Conectada:</strong> {account}</p>
                    <p>
                        <strong>Seu link de referência:</strong> 
                        <a href={referralLink} target="_blank" rel="noopener noreferrer">{referralLink}</a>
                    </p>
                    <p><strong>Saldo de Tokens do Contrato:</strong> {contractTokenBalance !== null ? `${contractTokenBalance} Tokens `: 'Verificando...'}</p>
                    {/* Exibe informações do assinante, se disponíveis */}
                    {subscriberInfo ? (
                        <div style={styles.subscriberInfo}>
                            <p><strong>Status:</strong> {subscriberInfo.isTrial ? 'Período de Teste' : 'Assinante'}</p>
                            <p><strong>Plano:</strong> {subscriberInfo.plan.toString()}</p>
                            <p><strong>Data de Expiração:</strong> {subscriberInfo.subscriptionExpiry}</p>
                            <p><strong>Recompensa Acumulada:</strong> {subscriberInfo.reward} Tokens</p>
                        </div>
                    ) : (
                        <p>Carregando informações do assinante...</p>
                    )}
                </div>
            )}

            <div style={styles.section}>
                <h3>Registrar-se</h3>
                <div style={styles.buttonGroup}>
                    <button style={styles.button} onClick={registerWithReferral} disabled={isLoading}>
                        Registrar com Referência
                    </button>
                    <button style={styles.button} onClick={registerWithoutReferral} disabled={isLoading}>
                        Registrar sem Referência
                    </button>
                </div>
            </div>

            <div style={styles.section}>
                <h3>Renovar Assinatura</h3>
                <input
                    type="number"
                    placeholder="ID do Plano (1, 2, 3, 4 ou 5)"
                    value={planId}
                    onChange={(e) => {
                        setPlanId(e.target.value);
                        getPlanPrice(e.target.value); // Pega o preço do plano escolhido
                    }}
                    style={styles.input}
                />
                {planPrice && <p><strong>Preço do Plano:</strong> {planPrice} Tokens</p>}
                <button style={styles.button} onClick={renewSubscription} disabled={isLoading}>
                    Renovar
                </button>
            </div>

            {isLoading && <p style={styles.loading}>Processando...</p>}
        </div>
    );
};

// Estilos simples para o componente
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    header: {
        textAlign: 'center',
        color: '#333'
    },
    error: {
        color: 'red',
        backgroundColor: '#ffe6e6',
        padding: '10px',
        borderRadius: '5px'
    },
    success: {
        color: 'green',
        backgroundColor: '#e6ffe6',
        padding: '10px',
        borderRadius: '5px'
    },
    button: {
        padding: '10px 20px',
        margin: '10px 5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        padding: '10px',
        width: '100%',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    section: {
        marginTop: '20px'
    },
    infoContainer: {
        marginTop: '20px',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)'
    },
    subscriberInfo: {
        marginTop: '10px'
    },
    loading: {
        color: '#333',
        fontStyle: 'italic'
    }
};

export default SubscriberSystem;