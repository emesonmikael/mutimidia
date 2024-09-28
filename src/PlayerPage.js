import React from 'react';
import ReactPlayer from 'react-player';
import { useParams, useLocation } from 'react-router-dom';
import M3UPlayerOiPlay from './OiPlay copy';




const PlayerPage = () => {
  const { channelName } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get('url');
 
  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div>
     

      <h2>Playing: {channelName}</h2>
      {url ? (
        <div className="player-wrapper" style={{ marginTop: '20px' }}>
          <ReactPlayer url={url} controls width="100%" height="100%" />
          <button onClick={ openInNewTab(url)} style={{ marginTop: '10px' }}>
            Abrir em outro navegador
          </button>
        </div>
      ) : (
        <p>URL não encontrada.</p>
      )}
    </div>
  );
};

export default PlayerPage;