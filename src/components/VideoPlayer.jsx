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
        playsinline
        pip={false}
        stopOnUnmount={false}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              disablePictureInPicture: true,
              onContextMenu: e => e.preventDefault()
            }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;
