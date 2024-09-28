import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import SubscriberManagerABI from './SubscriberManagerABI.json'; // ABI do contrato
import  { useState, useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [referralLink, setReferralLink] = useState('');
    const [account, setAccount] = useState('');
    const [referrer, setReferrer] = useState('');
    const [subscriberInfo, setSubscriberInfo] = useState(null);
    const [planId, setPlanId] = useState('');
    const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [planPrice, setPlanPrice] = useState(null);

    const contractAddress = '0x823B305461153DEaa4B5f0dE85C0310ff1c235C6'; // Endereço do contrato
    const paymentTokenAddress = '0x7D928bDC1Ae6dCC6b4D7c744c3603aD4f64e874f'; // Endereço do token de pagamento

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = urlParams.get('ref');
      if (referrer) setReferrer(referrer);
  }, []);

  const connectWallet = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

       
       
    } catch (error) {
        console.error('Erro ao conectar a carteira:', error);
    }
};

  const goToLogin = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Bem-vindo à Página Inicial</h2>
      <p>Esta é uma página pública. Conecte sua carteira para acessar conteúdo exclusivo.</p>
      <button onClick={goToLogin}>Conectar Carteira</button>
    </div>
  );
};

export default HomePage;