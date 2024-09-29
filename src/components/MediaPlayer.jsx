// src/components/MediaPlayer.jsx
import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import ChannelSelector from './ChannelSelector';
import { parseM3U } from '../utils/parseM3U';

const MediaPlayer = () => {
  const videoRef = useRef(null);
  const [channels, setChannels] = useState([]);
  const [currentStream, setCurrentStream] = useState('');

  useEffect(() => {
    // Função para buscar e parsear o arquivo M3U
    const fetchAndParseM3U = async () => {
      try {
        // Substitua pelo caminho correto do seu arquivo M3U
        const response = await fetch('/playlist.m3u');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const m3uText = await response.text();
        const parsedChannels = parseM3U(m3uText);
        setChannels(parsedChannels);
        if (parsedChannels.length > 0) {
          setCurrentStream(parsedChannels[0].url); // Definir o primeiro canal como padrão
        }
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
      }
    };

    fetchAndParseM3U();
  }, []);

  useEffect(() => {
    if (!currentStream) return;

    const video = videoRef.current;
    let hls;

    const loadStream = (url) => {
      if (Hls.isSupported()) {
        if (hls) {
          hls.destroy();
        }
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('Erro no HLS:', data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      } else {
        console.error('HLS não é suportado neste navegador.');
      }
    };

    loadStream(currentStream);

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [currentStream]);

  const handleSelectChannel = (url) => {
    setCurrentStream(url);
  };

  return (
    <div>
      <h1>TS Media Player com hls.js</h1>
      {channels.length > 0 ? (
        <>
          <ChannelSelector channels={channels} onSelect={handleSelectChannel} />
          <video ref={videoRef} controls width="600">
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </>
      ) : (
        <p>Carregando canais...</p>
      )}
    </div>
  );
};

export default MediaPlayer;