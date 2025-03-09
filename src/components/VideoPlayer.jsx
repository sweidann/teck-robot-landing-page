import ReactPlayer from "react-player";

const VideoPlayer = ({url}) => {
  return (
    <div style={{ width: "100%",height : "100%" , position : "absolute" ,  margin: "auto" , left: "-30vw", top : "-10vh"}}>
      <ReactPlayer 
        url={url}
        playing
        muted 
        width="100%" 
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
