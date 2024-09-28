import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const M3UPlayerHbo = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const navigate = useNavigate();

  // Função para processar o conteúdo do arquivo M3U e extrair links e metadados
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
          url: streamUrl,
        });
      }
    }

    setChannels(parsedChannels);
  };

  // Função para carregar o arquivo M3U automaticamente da pasta pública
  useEffect(() => {
    const loadM3UFile = async () => {
      try {
        const response = await fetch('/listaHbo.m3u'); // Substitua 'playlist.m3u' pelo nome do seu arquivo
        const content = await response.text();
        processM3U(content);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    loadM3UFile();
  }, []);

  // Função para verificar se o URL é de um tipo de mídia suportado pelo ReactPlayer
  const isSupportedMedia = (url) => {
    const supportedFormats = ['mp4', 'webm', 'ogg', 'm3u8', 'mp3', 'wav', 'flac'];
    const fileExtension = url.split('.').pop().toLowerCase();
    return supportedFormats.includes(fileExtension) || ReactPlayer.canPlay(url);
  };

  const handleChannelSelect = (channel) => {
    if (isSupportedMedia(channel.url)) {
      setSelectedChannel(channel);
      // Navega para a página do player passando o nome do canal na URL
      navigate(`player/${encodeURIComponent(channel.name)}?url=${encodeURIComponent(channel.url)}`);
    } else {
      alert('Formato de mídia não suportado. Selecione outro canal.');
    }
  };

  const handleSaveToFile = () => {
    const blob = new Blob([JSON.stringify(channels, null, 2)], { type: 'application/json' });
    saveAs(blob, 'channels.json');
  };

  return (
    <div>
      <h2>M3U Player</h2>

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
          <button onClick={handleSaveToFile} style={{ marginTop: '20px' }}>
            Save Channels to File
          </button>
        </>
      )}

      {selectedChannel && (
        <div className="player-wrapper" style={{ marginTop: '20px' }}>
          <h3>{selectedChannel.name}</h3>
          <ReactPlayer url={selectedChannel.url} controls width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};

export default M3UPlayerHbo;