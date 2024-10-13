import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer1 = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", maxWidth: "800px" }}
      />
    </div>
  );
};

export default VideoPlayer1;