import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import M3UPlayer from "./M3UPlayer2";
import PlayerPage from './PlayerPage';

function Home(){
    const navigate = useNavigate();

    const goToLogin = () => {
      navigate("/login"); // Redireciona para a página de login
    };

    return(
        <div>
 <h1> pagina home</h1>  <button onClick={goToLogin}>Conectar Carteira</button>
 <a href="https://streamer-liard.vercel.app/netfli">
      Netflix Filme  
<p>

</p>
</a>
<a href="https://streamer-liard.vercel.app/Hbo">
HBO Max
</a>

<p>

</p>
<a href="https://streamer-liard.vercel.app/Globo">
Globoplay
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/DisneyPlus">
Disney Plus
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/ParamountPlus">
Paramount Plus
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Max">
Max
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Clarovideo">
Claro video
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/GooglePlayMovies">
Google Play Movies
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/MGMChannel">
MGMChannel
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Oldflix">
Oldflix
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/NOW">
NOW
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Vudu">
Vudu
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AMConDemand">
AMC on Demand
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/ParamountPlusAppleTVChannel">
Paramount Plus Apple TV Channel
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/UniverVideo">
Univer Video
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/NetflixbasicwithAds">
Netflix basic with Ads
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/OiPlay">
Oi Play
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Looke">
Looke
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Filmicca">
Filmicca
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/Lancamentos2024">
Lancamentos 2024
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>
<p></p>
<a href="https://streamer-liard.vercel.app/AmazonPrime">
Amazon Prime
</a>

 </div>
    

    );
}
export default Home;