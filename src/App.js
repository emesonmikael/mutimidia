import React from "react";
import M3UPlayer from "./M3UPlayer";

function App() {
  const m3uUrl = "http://localhost:3000/canais.m3u"; // Seu link .m3u

  return (
    <div>
      <h1>Reprodutor de Vídeo M3U</h1>
      <M3UPlayer m3uUrl={m3uUrl} />
    </div>
  );
}

export default App;