import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditarPerfil() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
      navigate('/login'); // Redireciona para o login se não estiver autenticado
    } else {
      setLogin(loggedInUser.login);
      setSenha(loggedInUser.senha);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Buscar os usuários armazenados no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o novo login já pertence a outro usuário
    const userExists = storedUsers.find((u) => u.login === login && u.login !== JSON.parse(localStorage.getItem('loggedInUser')).login);
    if (userExists) {
      setError('Login já está em uso por outro usuário.');
      return;
    }

    // Atualiza os dados do usuário logado
    const updatedUsers = storedUsers.map((user) => {
      if (user.login === JSON.parse(localStorage.getItem('loggedInUser')).login) {
        return { ...user, login, senha };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Atualiza o usuário logado no LocalStorage
    const updatedLoggedInUser = { login, senha, estadoConexao: true };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));

    setSuccess('Dados atualizados com sucesso!');
    setError('');
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Novo Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Atualizar Dados</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default EditarPerfil;