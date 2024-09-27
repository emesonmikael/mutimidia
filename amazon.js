import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const M3UPlayerAmazonPrime = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  // Função para conectar a carteira usando MetaMask ou WalletConnect
  const connectWallet = async () => {
    try {
      let provider;
      // Configurando WalletConnect com o Infura


      // Tenta usar MetaMask primeiro
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Solicita ao usuário que conecte a carteira
      } else {
        // Se não houver MetaMask, tenta conectar com WalletConnect
        //const YOUR_INFURA_PROJECT_ID = '4f2cf2bc50c8496bb379695691632d3d'; // Coloque o seu Project ID aqui
       
  
        //const instance = await web3Modal.connect();
        //const web3Provider = new ethers.providers.Web3Provider(instance);
       // setProvider(web3Provider);
  
       // const signer = web3Provider.getSigner();
       // const address = await signer.getAddress();
        //setWalletAddress(address);

       // provider = new ethers.providers.Web3Provider(await walletConnect.getProvider());
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address); // Define o endereço da carteira conectada
    } catch (error) {
      console.error("Erro ao conectar a carteira:", error);
      alert("Não foi possível conectar a carteira. Verifique se você possui uma carteira instalada.");
    }
  };

  const processM3U = (m3uContent) => {
    const lines = m3uContent.split('\n');
    const parsedChannels = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const metadata = lines[i];
        const streamUrl = lines[i + 1];
        const nameMatch = metadata.match(/,([^\r\n]+)/);
        const logoMatch = metadata.match(/tvg-logo="([^"]+)"/);

        parsedChannels.push({
          name: nameMatch ? nameMatch[1] : 'Unknown',
          logo: logoMatch ? logoMatch[1] : null,
          url: streamUrl.trim(),
        });
      }
    }

    setChannels(parsedChannels);
  };

  useEffect(() => {
    // Carrega o arquivo M3U automaticamente do projeto
    const loadM3UFile = async () => {
      try {
        const response = await fetch('/AmaonPrimer.m3u'); // Altere o caminho conforme necessário
        const content = await response.text();
        processM3U(content);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    loadM3UFile();
  }, []);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    window.open(channel.url, '_blank'); // Abre o vídeo em uma nova aba do navegador padrão
  };

  return (
    <div>
      {!walletAddress ? (
        <button onClick={connectWallet}>Conectar com a Carteira</button>
      ) : (
        <>
          <h2>M3U Player - Conectado: {walletAddress}</h2>

          {channels.length > 0 && (
            <>
              <div>
                <h3>Select a Channel:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {channels.map((channel, index) => (
                    <div
                      key={index}
                      onClick={() => handleChannelSelect(channel)}
                      style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: '120px',
                      }}
                    >
                      {channel.logo && (
                        <img src={channel.logo} alt={channel.name} style={{ width: '100%' }} />
                      )}
                      <p>{channel.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedChannel && (
            <div className="player-wrapper" style={{ marginTop: '20px' }}>
              <h3>{selectedChannel.name}</h3>
              <video
                src={selectedChannel.url}
                controls
                width="100%"
                height="100%"
                onError={() => alert('Erro ao carregar o vídeo. Tente abrir em outro navegador.')}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default M3UPlayerAmazonPrime;