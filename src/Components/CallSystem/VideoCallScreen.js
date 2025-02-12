import { useMediaStream } from "../../Context/SocketProvider";

const VideoCallScreen = () => {
  const { userVideo, remoteVideo } = useMediaStream();

  return (
    <div>
      <h2>📹 Video Call</h2>
      <video ref={userVideo} autoPlay playsInline muted />
      <video ref={remoteVideo} autoPlay playsInline />
    </div>
  );
};

export default VideoCallScreen;
