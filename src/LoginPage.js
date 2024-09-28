import SubscriberSystem from './SubscriberSystem';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import ABI from './ABI.json';  // ABI do contrato

const LoginPage = ({ onLoginSuccess }) => {
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const contractAddress = '0x5f16FE1A416BB62548D37F02D2ceb4305FDD37A3';  // Endereço do contrato

  function registrar(){
    navigate('/Subscriber?ref=0x725e02d671aa828515e4080e97d0679eb3e867ac');
  }
  // Conectar MetaMask diretamente usando ethers.js
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Solicitar acesso à MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Erro ao conectar a carteira', err);
      }
    } else {
      alert('MetaMask não está instalada');
    }
  };

  // Verificar se o usuário está registrado no contrato
  const checkRegistration = async () => {
    if (!account) return;

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const subscriberInfo = await contract.subscribers(account);

      if (subscriberInfo.isRegistered) {
        setIsRegistered(true);
        onLoginSuccess();  // Chama a função de sucesso de login
        navigate('/Home');  // Navega para a página /content
      } else {
        setError('Usuário não registrado.');
      }
    } catch (err) {
      console.error('Erro ao verificar registro', err);
      setError('Erro ao verificar registro.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      checkRegistration();
    }
  }, [account]);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={registrar}>Registrar</button>
      
      {!account ? (
        <button onClick={connectWallet}>Conectar Carteira</button>
        
      ) : loading ? (
        <p>Verificando registro...</p>
      ) : isRegistered ? (
        <p>Login realizado com sucesso!</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LoginPage;