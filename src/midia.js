// src/components/MediaPlayer.jsx
import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const MediaPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource (`${process.env.PUBLIC_URL}/PlayList.m3u8`);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('Erro no HLS:', data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = `${process.env.PUBLIC_URL}/PlayList.m3u8`;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    } else {
      console.error('HLS não é suportado neste navegador.');
    }
  }, []);

  return (
    <div>
      <h1>TS Media Player com hls.js</h1>
      <video ref={videoRef} controls width="600">
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
};

export default MediaPlayer;