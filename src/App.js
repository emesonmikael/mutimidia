import React from "react";
import M3UPlayer from "./M3UPlayer";

function App() {
  const m3uUrl = "https://proxy-server-eight-omega.vercel.app/proxy/ssiptv.php?username=220789&password=989122&ssiptv&output=mpegts"; // Seu link .m3u

  return (
    <div>
      <h1>Reprodutor de Vídeo M3U</h1>
      <M3UPlayer m3uUrl={m3uUrl} />
    </div>
  );
}

export default App;
