import React from 'react';

const ChannelSelector = ({ channels, onSelect }) => {
  return (
    <div style={styles.container}>
      {channels.map((channel, index) => (
        <div 
          key={index} 
          style={styles.channelCard} 
          onClick={() => onSelect(channel.url)}
        >
          {channel.logo ? (
            <img src={channel.logo} alt={channel.name} style={styles.logo} />
          ) : (
            <div style={styles.placeholderLogo}>Sem Logo</div>
          )}
          <p style={styles.channelName}>{channel.name}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  channelCard: {
    width: '150px',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  logo: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px'
  },
  placeholderLogo: {
    width: '100%',
    height: '100px',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999'
  },
  channelName: {
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

export default ChannelSelector;