import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App3 = () => {
    const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega e processa o arquivo .m3u
    fetch('/lista.m3u') // Certifique-se de que o arquivo .m3u está na pasta public
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const parsedChannels = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('#EXTINF')) {
            const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
            const nameMatch = lines[i].split(',')[1];

            if (logoMatch && nameMatch) {
              const tvgLogo = logoMatch[1];
              const name = nameMatch.trim().replace(/\s/g, ''); // Remove espaços para formar a rota
              const streamUrl = lines[i + 2]?.trim(); // O URL está duas linhas abaixo
              
              parsedChannels.push({ name, tvgLogo, streamUrl });
            }
          }
        }

        setChannels(parsedChannels);
      })
      .catch(error => console.error('Erro ao carregar o arquivo .m3u', error));
  }, []);

  const handleImageClick = (name) => {
    navigate(`/${name}`); // Redireciona para a rota com base no nome do canal
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {channels.map((channel, index) => (
        <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
          <img
            src={channel.tvgLogo}
            alt={channel.name}
            onClick={() => handleImageClick(channel.name)} // Ao clicar, usa o navigate para a rota com o nome do canal
            style={{ cursor: 'pointer', width: '150px', height: '150px', borderRadius: '10px' }}
          />
          <p>{channel.name}</p>
        </div>
      ))}
    </div>
  );
};

export default App3;