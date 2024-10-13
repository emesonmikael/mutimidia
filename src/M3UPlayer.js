import React, { useState, useEffect } from "react";
import VideoPlayer1 from "./VideoPlayer1";

const M3UPlayer = ({ m3uUrl }) => {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchM3U = async () => {
      try {
        const response = await fetch(m3uUrl);
        const text = await response.text();
        const urls = text.split("\n").filter(line => line && !line.startsWith("#"));
        setVideoUrls(urls);
      } catch (error) {
        console.error("Error loading .m3u file:", error);
      }
    };

    fetchM3U();
  }, [m3uUrl]);

  return (
    <div>
      {videoUrls.length > 0 ? (
        <div>
          {videoUrls.map((url, index) => (
            <div key={index}>
              <h4>Video {index + 1}</h4>
              <VideoPlayer1 src={url} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default M3UPlayer;