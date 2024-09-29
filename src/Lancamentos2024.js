
import React, { useState, useEffect } from 'react';
import './App.css'; // Arquivo CSS para os estilos

// Função para buscar e processar o arquivo M3U
const fetchM3U = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo M3U: ${response.statusText}`);
    }
    const text = await response.text();
    return parseM3U(text);
  } catch (error) {
    console.error('Falha ao buscar o arquivo M3U:', error);
    return [];
  }
};

// Função para fazer o parse do conteúdo M3U
const parseM3U = (content) => {
  const lines = content.split('\n');
  let items = [];
  let currentItem = {};

  lines.forEach((line) => {
    if (line.startsWith('#EXTINF')) {
      const titleMatch = line.match(/,(.*)$/);
      if (titleMatch) currentItem.title = titleMatch[1];

      const logoMatch = line.match(/tvg-logo="(.*?)"/);
      if (logoMatch) currentItem.tvgLogo = logoMatch[1];
    } else if (line.startsWith('#EXTBG')) {
      const bgMatch = line.match(/#EXTBG: (.*)/);
      if (bgMatch) currentItem.background = bgMatch[1];
    } else if (line.startsWith('http') || line.startsWith('/')) {
      currentItem.url = line.trim();  // Para evitar problemas de espaço extra
      items.push(currentItem);
      currentItem = {};
    }
  });
  return items;
};

const M3UPlayerLancamentos2024 = () => {
  const [items, setItems] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(`${window.location.origin}/lançamentos2024.m3u`);

  // Função para carregar o arquivo M3U ao iniciar
  useEffect(() => {
    const loadM3U = async () => {
      const parsedItems = await fetchM3U(currentUrl);
      setItems(parsedItems);
    };

    loadM3U();
  }, [currentUrl]);

  // Quando o usuário clica em um item
  const handleItemClick = (url) => {
    if (url.endsWith('.mp4')) {
      // Caso seja um vídeo, abrir direto o MP4
      window.open(url, '_blank');
    } else {
      // Caso seja outro M3U, atualiza o URL para carregar o novo arquivo
      const nextUrl = url.startsWith('/Series') ? `${window.location.origin}${url} `: url;
      setCurrentUrl(nextUrl);
    }
  };

  return (
    <div className="container">
      <h1>Playlist de Séries</h1>
      <div className="grid-container">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid-item"
            style={{ background: item.background || '#11609e' }}
          >
            {item.tvgLogo && (
              <img 
                src={item.tvgLogo}
                alt={item.title}
                className="thumbnail"
                onClick={() => handleItemClick(item.url)}
              />
            )}
            <h2 onClick={() => handleItemClick(item.url)} className="title">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default M3UPlayerLancamentos2024;
