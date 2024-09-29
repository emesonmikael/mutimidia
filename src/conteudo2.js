import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import M3UPlayer from './M3UPlayer';
import PlayerPage from './PlayerPage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';  // Componente de rota privada
import M3UPlayerHbo from './M3UPlayer copy';
import M3UPlayerGloboplay from './Globoplay';
import M3UPlayerAmazonPrime from './amazon';
import M3UPlayerDisneyPlus from './DisneyPlus';
import M3UPlayerParamountPlus from './ParamountPlus';
import M3UPlayerMax from './Max';
import M3UPlayerClarovideo from './Clarovideo';
import M3UPlayerGooglePlayMovies from './GooglePlayMovies';
import M3UPlayerMGMChannel from './MGMChannel';
import M3UPlayerOldflix from './Oldflix';
import M3UPlayerNOW from './NOW';
import M3UPlayerVudu from './Vudu';
import M3UPlayerAMConDemand from './AMConDemand';
import M3UPlayerParamountPlusAppleTVChannel from './ParamountPlusAppleTVChannel';
import M3UPlayerUniverVideo from './UniverVideo';
import M3UPlayerNetflixbasicwithAds from './NetflixbasicwithAds';
import M3UPlayerOiPlay from './OiPlay';
import M3UPlayerLooke from './Looke';
import M3UPlayerFilmicca from './Filmicca';
import M3UPlayerLancamentos2024 from './Lancamentos2024';
import SubscriberSystem from './SubscriberSystem';
import M3UPlayerLançamentos2023 from './Lançamentos2023';
import M3UPlayerGuerra from './Guerra';
import M3UPlayerMarvel from './Marvel';
import M3UPlayerFaroeste from './Faroeste';
import M3UPlayerTerror from './Terror';
import M3UPlayerFantasiaeFicção from './FantasiaeFicção';
import M3UPlayerDrama from './Drama';
import M3UPlayerComédia from './Comédia';
import M3UPlayerAnimes from './Animes';
import M3UPlayerInfantil from './Infantil';
import M3UPlayerAção from './Ação';
import M3UPlayerNacionais from './Nacionais';
import M3UPlayerRomance from './Romance';
import M3UPlayerSuspense from './Suspense';
import M3UPlayerDocumentarios from './Documentarios';
import M3UPlayerReligiosos from './Religiosos';
import "./App.css";
import App2 from './Series'
import App3 from './prinipal';
import MediaPlayer from './components/MediaPlayer';


function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLoginSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');  // Salva no localStorage
  };
  useEffect(() => {
    const registered = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(registered);  // Restaura o estado de login do localStorage
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/FILMES" element={ <PrivateRoute isRegistered={isRegistered}><Home /></PrivateRoute>} />
        <Route path="/CANAIS" element={ <PrivateRoute isRegistered={isRegistered}><MediaPlayer /></PrivateRoute>} />
        <Route path="/Series" element={ <PrivateRoute isRegistered={isRegistered}><App2/></PrivateRoute>} />
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        {/* Crie rotas dinâmicas baseadas no nome do canal */}
        
        <Route
            path="/Netflix"
            element={
              <PrivateRoute isRegistered={isRegistered}>
                <M3UPlayer />
                </PrivateRoute>
            }
          />
        <Route path="/OiPlay" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerOiPlay /></PrivateRoute>} />
        <Route path="/Subscriber" element={<SubscriberSystem />} />
        <Route path="/HBOMax" element={<M3UPlayerHbo />} />
        <Route path="/Globoplay" element={<M3UPlayerGloboplay />} />
        <Route path="/DisneyPlus" element={<M3UPlayerDisneyPlus />} />
        <Route path="/AmazonPrimeVideo" element={<M3UPlayerAmazonPrime />} />
        <Route path="/ParamountPlus" element={<M3UPlayerParamountPlus />} />
        <Route path="/Max" element={<M3UPlayerMax />} />
        <Route path="/Clarovideo" element={<M3UPlayerClarovideo />} />
        <Route path="/GooglePlayMovies" element={<M3UPlayerGooglePlayMovies />} />
        <Route path="/MGMChannel" element={<M3UPlayerMGMChannel />} />
        <Route path="/Oldflix" element={<M3UPlayerOldflix />} />
        <Route path="/NOW" element={<M3UPlayerNOW />} />
        <Route path="/Vudu" element={<M3UPlayerVudu />} />
        <Route path="/AMConDemand" element={<M3UPlayerAMConDemand />} />
        <Route path="/ParamountPlusAppleTVChannel" element={<M3UPlayerParamountPlusAppleTVChannel />} />
        <Route path="/UniverVideo" element={<M3UPlayerUniverVideo />} />
        <Route path="/NetflixbasicwithAds" element={<M3UPlayerNetflixbasicwithAds />} />
        <Route path="/OiPlay" element={<M3UPlayerOiPlay />} />
        <Route path="/Looke" element={<M3UPlayerLooke />} />
        <Route path="/Filmicca" element={<M3UPlayerFilmicca />} />
        <Route path="/Lancamentos2024" element={<M3UPlayerLancamentos2024 />} />
        <Route path="/Marvel" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerMarvel /></PrivateRoute>} />
        <Route path="/Guerra" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerGuerra /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        <Route path="/Faroeste" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerFaroeste /></PrivateRoute>} />
        <Route path="/Lançamentos2023" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerLançamentos2023 /></PrivateRoute>} />
        <Route path="/FantasiaeFicção" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerFantasiaeFicção /></PrivateRoute>} />
        <Route path="/Drama" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerDrama /></PrivateRoute>} />
        <Route path="/Comédia" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerComédia /></PrivateRoute>} />
        <Route path="/Animes" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerAnimes /></PrivateRoute>} />
        <Route path="/Infantil" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerInfantil /></PrivateRoute>} />
        <Route path="/Ação" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerAção /></PrivateRoute>} />
        <Route path="/Nacionais" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerNacionais /></PrivateRoute>} />
        <Route path="/Romance" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerRomance /></PrivateRoute>} />
        <Route path="/Suspense" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerSuspense /></PrivateRoute>} />
        <Route path="/Documentarios" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerDocumentarios/></PrivateRoute>} />
        <Route path="/Religiosos" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerReligiosos /></PrivateRoute>} />
        <Route path="/prinipal" element={<PrivateRoute isRegistered={isRegistered}><App3 /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        <Route path="/Terror" element={<PrivateRoute isRegistered={isRegistered}><M3UPlayerTerror /></PrivateRoute>} />
        
        <Route path="/Marvel/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Lançamentos2023/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Faroeste/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/FantasiaeFicção/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Drama/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Comédia/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Animes/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Infantil/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Ação/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Nacionais/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Romance/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Suspense/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Documentarios/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Religiosos/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        <Route path="/Terror/player/:channelName" element={<PrivateRoute isRegistered={isRegistered}><PlayerPage /></PrivateRoute>} />
        
        <Route path="/netfli/player/:channelName" element={<PlayerPage />} />
        <Route path="/Hbo/player/:channelName" element={<PlayerPage />} />
        <Route path="/Globo/player/:channelName" element={<PlayerPage />} />
        <Route path="/DisneyPlus/player/:channelName" element={<PlayerPage />} />
        <Route path="/AmazonPrime/player/:channelName" element={<PlayerPage />} />

        <Route path="/ParamountPlus/player/:channelName" element={<PlayerPage />} />
        <Route path="/Max/player/:channelName" element={<PlayerPage />} />
        <Route path="/Clarovideo/player/:channelName" element={<PlayerPage />} />
        <Route path="/GooglePlayMovies/player/:channelName" element={<PlayerPage/>} />

        <Route path="/MGMChannel/player/:channelName" element={<PlayerPage />} />
        <Route path="/Oldflix/player/:channelName" element={<PlayerPage  />} />

        <Route path="/NOW/player/:channelName" element={<PlayerPage  />} />
        <Route path="/Vudu/player/:channelName" element={<PlayerPage />} />
        <Route path="/AMConDemand/player/:channelName" element={<PlayerPage />} />
        <Route path="/ParamountPlusAppleTVChannel/player/:channelName" element={<PlayerPage  />} />
        <Route path="/UniverVideo/player/:channelName" element={<PlayerPage  />} />
        
        <Route path="/NetflixbasicwithAds/player/:channelName" element={<PlayerPage/>} />
        <Route path="/OiPlay/player/:channelName" element={<PlayerPage />} />
        <Route path="/Looke/player/:channelName" element={<PlayerPage />} />
        <Route path="/Filmicca/player/:channelName" element={<PlayerPage />} />
        <Route path="/Lancamentos2024/player/:channelName" element={<PlayerPage />} />
        
        <Route path="/Netflix/player/:channelName" element={<PlayerPage />} />
        <Route path="/OiPlay/player/:channelName" element={<PlayerPage />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

function Home() {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega e processa o arquivo .m3u
    fetch('/listaFilmes.m3u') // Certifique-se de que o arquivo .m3u está na pasta public
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const parsedChannels = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('#EXTINF')) {
            const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
            const nameMatch = lines[i].split(',')[1];

            if (logoMatch && nameMatch) {
              const tvgLogo = logoMatch[1];
              const name = nameMatch.trim().replace(/\s/g, ''); // Remove espaços para formar a rota
              const streamUrl = lines[i + 2]?.trim(); // O URL está duas linhas abaixo
              
              parsedChannels.push({ name, tvgLogo, streamUrl });
            }
          }
        }

        setChannels(parsedChannels);
      })
      .catch(error => console.error('Erro ao carregar o arquivo .m3u', error));
  }, []);

  const handleImageClick = (name) => {
    navigate(`/${name}`); // Redireciona para a rota com base no nome do canal
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {channels.map((channel, index) => (
        <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
          <img
            src={channel.tvgLogo}
            alt={channel.name}
            onClick={() => handleImageClick(channel.name)} // Ao clicar, usa o navigate para a rota com o nome do canal
            style={{ cursor: 'pointer', width: '150px', height: '150px', borderRadius: '10px' }}
          />
          <p>{channel.name}</p>
        </div>
      ))}
    </div>
  );
}

function ChannelPage({ name }) {
  return <h1>Bem-vindo ao canal {name}</h1>;
}

export default App;