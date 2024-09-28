
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ connectWallet }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await connectWallet();
    navigate("/protected"); // Redireciona para a página protegida após a conexão
  };

  return (
    <div>
      <h2>Conectar Carteira</h2>
      <p>Por favor, conecte sua carteira para acessar o conteúdo protegido.</p>
      <button onClick={handleLogin}>Conectar MetaMask</button>
    </div>
  );
};

export default LoginPage;