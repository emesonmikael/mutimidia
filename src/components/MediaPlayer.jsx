import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import ChannelSelector from './ChannelSelector';
import channels from '../data/chanels';

const MediaPlayer = () => {
  const videoRef = useRef(null);
  const [currentStream, setCurrentStream] = useState(channels[0].url);

  useEffect(() => {
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
      <ChannelSelector channels={channels} onSelect={handleSelectChannel} />
      <video ref={videoRef} controls width="600">
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
};

export default MediaPlayer;