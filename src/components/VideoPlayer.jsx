import ReactPlayer from "react-player";

const VideoPlayer = ({ url, style, playing }) => {
  return (
    <div style={style} className="videoContainer">
      <ReactPlayer
        url={url}
        playing={playing}
        muted
        playsinline
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              playsInline: true,
              webkitPlaysinline: "true",
              preload: "auto",
              autoPlay: true,
              muted: true,
            },
            forceVideo: true,
            forceHLS: true,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
