import React, { useState } from 'react';
import { ethers } from 'ethers';
import SubscriptionManagerABI from './SubscriptionManagerABI.json'; // ABI do contrato

const CheckSubscription = () => {
    const [isActive, setIsActive] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    const checkSubscriberStatus = async () => {
        try {
            // Endereço do contrato (substituir pelo seu contrato)
            const contractAddress = '0xSeuContratoAqui';
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Conecta-se ao contrato usando a ABI e o endereço
            const contract = new ethers.Contract(contractAddress, SubscriptionManagerABI, signer);

            // Chama a função isSubscriberActive do contrato
            const status = await contract.isSubscriberActive(address);
            setIsActive(status);
        } catch (err) {
            setError("Erro ao consultar o contrato: " + err.message);
        }
    };

    return (
        <div>
            <h2>Verificar Status de Assinatura</h2>
            <input 
                type="text" 
                placeholder="Endereço do usuário" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />
            <button onClick={checkSubscriberStatus}>Verificar</button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {isActive ? (
                <p>O assinante está ativo.</p>
            ) : (
                <p>O assinante não está ativo.</p>
            )}
        </div>
    );
};

export default CheckSubscription;