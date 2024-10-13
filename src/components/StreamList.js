
// src/components/StreamList.js
import React from 'react';
import './StreamList.css';

const StreamList = ({ streams, onSelect }) => {
  return (
    <div className="stream-list">
      <h2>Streams Disponíveis</h2>
      <ul>
        {streams.map((stream, index) => (
          <li key={index} onClick={() => onSelect(stream.url)}>
            {stream.logo && <img src={stream.logo} alt={`${stream.name} logo`} width="50" />}
            <span>{stream.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;