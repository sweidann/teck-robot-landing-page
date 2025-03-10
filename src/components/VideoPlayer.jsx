import ReactPlayer from "react-player";

const VideoPlayer = ({url , style , playing}) => {
  return (
    <div style={style}>
      <ReactPlayer 
        url={url}
        playing = {playing}
        muted 
        width="100%" 
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
