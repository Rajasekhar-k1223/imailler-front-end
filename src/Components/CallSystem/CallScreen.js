import React, { useState, useRef, useEffect, useContext } from "react";
import Peer from "simple-peer";
import { SocketContext, useMediaStream, useCallHandler } from "../../Context/SocketProvider";

const CallScreen = ({ callerEmail }) => {
  const { socket } = useContext(SocketContext);
  const { userVideo, remoteVideo } = useMediaStream();
  const { incomingCall, acceptCall, rejectCall } = useCallHandler();
  const callEmail = callerEmail;

  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const connectionRef = useRef();

  useEffect(() => {
    if (!socket) return;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (userVideo.current) {
          userVideo.current.srcObject = mediaStream;
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
    };
  }, [socket]);

  const callUser = (callEmail) => {
    if (!stream) {
      console.warn("Stream is not ready yet!");
      return;
    }

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall: callEmail, signalData: data, from: socket.id });
    });

    peer.on("stream", (remoteStream) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = remoteStream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const handleAcceptCall = () => {
    acceptCall(); // Accepts call & starts video
    setCallAccepted(true);
  };

  return (
    <div style={{ width: "95%", background: "#624262", height: "90vh", padding: "1rem", borderRadius: "5px", color: "#fff" }}>
      <h2>Video Call</h2>

      {/* 📞 Incoming Call Popup */}
      {incomingCall && !callAccepted && (
        <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translate(-50%)", padding: "1rem", background: "#fff", color: "#000", borderRadius: "10px", textAlign: "center" }}>
          <h3>Incoming Call...</h3>
          <button onClick={handleAcceptCall} style={{ margin: "5px", padding: "10px", background: "green", color: "#fff" }}>Accept</button>
          <button onClick={rejectCall} style={{ margin: "5px", padding: "10px", background: "red", color: "#fff" }}>Reject</button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>You</h3>
          <video ref={userVideo} autoPlay playsInline muted style={{ width: "300px", height: "200px", borderRadius: "10px", backgroundColor: "black" }} />
        </div>

        {callAccepted && (
          <div>
            <h3>Remote User</h3>
            <video ref={remoteVideo} autoPlay playsInline style={{ width: "300px", height: "200px", borderRadius: "10px", backgroundColor: "black" }} />
          </div>
        )}
      </div>

      <button onClick={() => callUser(callEmail)}>Call</button>
    </div>
  );
};

export default CallScreen;
