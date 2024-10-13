
// src/App.js
import React, { useEffect, useState } from 'react';
import StreamList from './components/StreamList';
import VideoPlayer from './components/VideoPlayer';
import './App.css';
import axios from 'axios';

function Canais() {
  const [streams, setStreams] = useState([]);
  const [currentStream, setCurrentStream] = useState('');

  // URL do arquivo M3U
  const m3uUrl = 'https://strimer-mutimidia.vercel.app/App/playlist.m3u'; // Substitua pela URL real do seu arquivo M3U

  useEffect(() => {

    const fetchM3U = async () => {
      try {
        const response = await axios.get(m3uUrl);
        const content = response.data;
        const streamsData = parseM3U(content);
        console.log('Streams Extraídos:', streamsData); // Log para verificar os streams
        setStreams(streamsData);
      } catch (error) {
        console.error('Erro ao buscar ou parsear o arquivo M3U:', error);
      }
    };

    fetchM3U();
  }, [m3uUrl]);

  const parseM3U = (content) => {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
    const streamsList = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        // Extrai os atributos da linha EXTINF
        const regex = /#EXTINF:-1\s+([^,]+),(.+)/;
        const match = lines[i].match(regex);
        if (match) {
          const attributesString = match[1];
          const name = match[2];

          // Extrai atributos chave-valor
          const attrRegex = /(\w+)="([^"]+)"/g;
          let attrMatch;
          const attributes = {};
          while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
            attributes[attrMatch[1]] = attrMatch[2];
          }

          // A próxima linha após EXTINF é a URL do stream
          const url = lines[i + 1] || '';

          streamsList.push({
            name: name,
            url: url,
            logo: attributes['tvg-logo'] || '',
            group: attributes['group-title'] || ''
          });
        }
      }
    }

    return streamsList;
  };

  const handleSelectStream = (url) => {
    console.log('Stream Selecionado:', url); // Log para verificar a seleção
    setCurrentStream(url);
  };

  return (
    <div className="App">
      <h1>Reprodutor de Vídeo M3U</h1>
      <div className="container">
        <StreamList streams={streams} onSelect={handleSelectStream} />
        <VideoPlayer url={currentStream} />
      </div>
    </div>
  );
}

export default Canais;