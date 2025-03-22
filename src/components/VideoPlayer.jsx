import ReactPlayer from "react-player";
import PropTypes from "prop-types";

const VideoPlayer = ({ url, style, playing, controls, onEnded }) => {
  return (
    <div style={style} className="videoContainer">
      <ReactPlayer
        url={url}
        playing={playing}
        muted={true}
        playsinline={true}
        loop={false}
        width="100%"
        height="100%"
        controls={controls || false}
        onEnded={onEnded}
        config={{
          file: {
            attributes: {
              playsInline: true,
              webkitplaysinline: "true",
              preload: "auto",
              autoPlay: true,
              muted: true,
              loop: false,
            },
            forceVideo: true,
            forceHLS: false,
          },
        }}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
  playing: PropTypes.bool,
  controls: PropTypes.bool,
  onEnded: PropTypes.func,
};

export default VideoPlayer;
