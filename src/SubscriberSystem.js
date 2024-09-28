import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato

const SubscriberSystem = () => {
    const [referralLink, setReferralLink] = useState('');
    const [account, setAccount] = useState('');
    const [referrer, setReferrer] = useState('');
    const [wallterreferrer, setWallterReferrer] = useState('');
    const [subscriberInfo, setSubscriberInfo] = useState(null);
    const [planId, setPlanId] = useState('');
    const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [planPrice, setPlanPrice] = useState(null);

    const contractAddress = '0x5f16FE1A416BB62548D37F02D2ceb4305FDD37A3'; // Endereço do contrato
    const paymentTokenAddress = '0x7129CaFA080583f2c173a6f09E6b5f383618d83D'; // Endereço do token de pagamento

    // Verifica se o link contém um referenciador
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = urlParams.get('ref');
        if (referrer) setReferrer(referrer);
    }, []);

    // Conectar carteira e buscar informações do assinante
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

            const referralLink = `${window.location.origin}/Subscriber?ref=${accounts[0]}`;
            setReferralLink(referralLink);

            // Verifica informações do assinante
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
            const subscriber = await contract.getSubscriberInfo(accounts[0]);

            // Convertemos os valores BigNumber para strings legíveis
            setSubscriberInfo({
                ...subscriber,
                subscriptionExpiry: new Date(subscriber.subscriptionExpiry * 1000).toLocaleString(),
                reward: ethers.utils.formatUnits(subscriber.reward, 18) // Converte a recompensa para string legível
            });
        } catch (error) {
            console.error('Erro ao conectar a carteira:', error);
            setErrorMessage("Erro ao conectar carteira. Verifique se a MetaMask está instalada e configurada corretamente.");
        }
    };

    const registerWithReferral = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
    
            const tx = await contract.register(referrer, {
                gasLimit: ethers.utils.hexlify(300000) // Define manualmente o limite de gas (ajuste conforme necessário)
            });
            await tx.wait();
            setSuccess(true);
        } catch (error) {
            console.error('Erro ao registrar com referência:', error);
            setSuccess(false);
            setErrorMessage('Falha ao registrar. Tente novamente.');
        }
    };
    const semReferencia ='0';
    const registerWith = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
    
            const tx = await contract.register(semReferencia, {
                gasLimit: ethers.utils.hexlify(300000) // Define manualmente o limite de gas (ajuste conforme necessário)
            });
            await tx.wait();
            setSuccess(true);
        } catch (error) {
            console.error('Erro ao registrar com referência:', error);
            setSuccess(false);
            setErrorMessage('Falha ao registrar. Tente novamente.');
        }
    };

    const renewSubscription = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Aprova o contrato para gastar os tokens
            const paymentToken = new ethers.Contract(paymentTokenAddress, ['function approve(address spender, uint256 amount) public returns (bool)'], signer);
            const planPrice = await getPlanPrice(planId);

            // Verifica se o preço do plano é válido antes de realizar a aprovação
            if (planPrice && planPrice.gt(0)) {
                await paymentToken.approve(contractAddress, planPrice);

                // Renova a assinatura após o pagamento
                const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, signer);
                const tx = await contract.renewSubscription(planId,{gasLimit: ethers.utils.hexlify(300000)});
                await tx.wait();
                setSuccess(true);
            } else {
                setErrorMessage('O preço do plano é inválido.');
            }
        } catch (error) {
            console.error('Erro ao renovar a assinatura:', error);
            setSuccess(false);
            setErrorMessage('Falha ao renovar assinatura. Verifique o saldo ou tente novamente.');
        }
    };

    const getPlanPrice = async (planId) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, SubscriberManagerABI, provider);
            const price = await contract.planPrices(planId);

            // Converte o preço para uma string legível
            const formattedPrice = ethers.utils.formatUnits(price, 18);
            setPlanPrice(formattedPrice);

            // Retorna o BigNumber para uso nas transações
            return price;
        } catch (error) {
            console.error('Erro ao buscar preço do plano:', error);
        }
    };

    return (
        <div>
            <h2>Sistema de Assinantes</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={connectWallet}>Conectar Carteira</button>
            {account && (
                <div>
                    <p>Seu link de referência: <a href={referralLink}>{referralLink}</a></p>
                    {/* Verifica se subscriberInfo não é nulo antes de renderizar */}
                    {subscriberInfo ? (
                        <div>
                            <p>Status: {subscriberInfo.isTrial ? 'Período de Teste' : 'Assinante'}</p>
                            <p>Plano: {subscriberInfo.plan.toString()}</p> {/* Converte o BigNumber em string */}
                            <p>Data de Expiração: {subscriberInfo.subscriptionExpiry}</p>
                            <p>Recompensa Acumulada: {subscriberInfo.reward} Tokens</p>
                        </div>
                    ) : (
                        <p>Carregando informações do assinante...</p>
                    )}
                </div>
            )}

            <h3>Registrar-se</h3>
            <button onClick={registerWithReferral}>Registrar </button>
            

            <h3>Renovar Assinatura</h3>
            <input
                type="number"
                placeholder="ID do Plano (1, 2, 3, 4 ou 5)"
                value={planId}
                onChange={(e) => {
                    setPlanId(e.target.value);
                    getPlanPrice(e.target.value); // Pega o preço do plano escolhido
                }}
            />
            {planPrice && <p>Preço do Plano: {planPrice} Tokens</p>}
            <button onClick={renewSubscription}>Renovar</button>

            {success && <p>Operação realizada com sucesso!</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SubscriberSystem;