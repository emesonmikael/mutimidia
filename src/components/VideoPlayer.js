import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Hls from 'hls.js';

const VideoPlayer = ({ url, title }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(playerRef.current);
      hls.on(Hls.Events.MANIFEST_LOADED, () => {
        setIsPlaying(true);
      });
    }
  }, [url]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const config = {
    file: {
      forceVideoCodec: 'h264',
      forceAudioCodec: 'aac',
    },
  };

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        controls={true}
        playbackId="video-player"
        url={url}
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        config={config}
      />
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default VideoPlayer;