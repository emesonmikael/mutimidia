// src/components/MediaPlayer.jsx
import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import ChannelSelector from './ChannelSelector';
import { parseM3U } from '../utils/parseM3U';

const MediaPlayer = () => {
  const videoRef = useRef(null);
  const [channels, setChannels] = useState([]);
  const [currentStream, setCurrentStream] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndParseM3U = async () => {
      try {
        const response = await fetch('/playlist.m3u');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const m3uText = await response.text();
        const parsedChannels = parseM3U(m3uText);
        setChannels(parsedChannels);
        if (parsedChannels.length > 0) {
          setCurrentStream(parsedChannels[0].url);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar o arquivo M3U:', error);
        setError(error.message);
        setLoading(false);
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
      {loading ? (
        <p>Carregando canais...</p>
      ) : error ? (
        <p>Erro: {error}</p>
      ) : channels.length > 0 ? (
        <>
          <ChannelSelector channels={channels} onSelect={handleSelectChannel} currentStream={currentStream} />
          <video ref={videoRef} controls width="600">
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </>
      ) : (
        <p>Nenhum canal encontrado.</p>
      )}
    </div>
  );
};

export default MediaPlayer;