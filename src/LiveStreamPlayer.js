
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const LiveStreamPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("http://zlb177.office646851.online/auth/349.m3u8"); // URL do stream
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = "http://zlb177.office646851.online/auth/349.m3u8";
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
      }
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: "100%" }} />
    </div>
  );
};

export default LiveStreamPlayer;
