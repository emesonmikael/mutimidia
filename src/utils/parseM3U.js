// src/utils/parseM3U.js

export const parseM3U = (m3uContent) => {
    const lines = m3uContent.split('\n');
    const channels = [];
    let currentChannel = {};
  
    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith('#EXTINF')) {
        // Extrair atributos da linha EXTINF
        const regex = /#EXTINF:-1\s+([^,]+),(.*)/;
        const match = line.match(regex);
        if (match) {
          const attributesString = match[1];
          const name = match[2].trim();
  
          // Extrair atributos chave-valor
          const attrs = {};
          const attrRegex = /(\w+?)="(.*?)"/g;
          let attrMatch;
          while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
            attrs[attrMatch[1]] = attrMatch[2];
          }
  
          currentChannel = {
            name: name || attrs['tvg-name'] || 'Sem Nome',
            logo: attrs['tvg-logo'] || '',
            url: '', // Será preenchido na próxima linha
            group: attrs['group-title'] || 'Sem Grupo',
          };
        }
      } else if (line && !line.startsWith('#')) {
        // Linha com a URL do stream
        if (currentChannel.name && line) {
          currentChannel.url = line;
          channels.push(currentChannel);
          currentChannel = {};
        }
      }
    });
  
    return channels;
  };