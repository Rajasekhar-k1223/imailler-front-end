import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useSocket } from "../../Context/SocketProvider";
import { useNavigate } from "react-router-dom";

//const socket = io("http://192.168.1.8:8765"); // Replace with your backend URL

const CallScreen = ({ callerEmail }) => {
  const socket = useSocket();
    const navigator = useNavigate();
    const callEmail = callerEmail
    console.log(callEmail)
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    console.log(socket)
    callUser(callEmail)
    navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
      console.log(socket)
    socket.on("callUser", (data) => {
      console.log(data)
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (callEmail) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

      peer.on("signal", (data) => {
        console.log(data)
      socket.emit("callUser", {
        userToCall: callEmail,
        signalData: data,
        from: socket.id,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  return (
    <div style={{    width: "95%",position: "absolute",zIndex: 1,
    background: "#624262",
    height: "90vh",
    margin: "auto",
    padding: "1rem",
    borderRadius: "5px",
    color: "#fff"}}>
      <h2>Video Call</h2>
      <div>
        <video ref={userVideo} autoPlay playsInline />
        {callAccepted && <video ref={partnerVideo} autoPlay playsInline />}
      </div>
      {/* <button onClick={() => callUser("user-id")}>Call</button> */}
      {receivingCall && !callAccepted && (
        <div>
          <h3>Incoming Call...</h3>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </div>
  );
};

export default CallScreen;
