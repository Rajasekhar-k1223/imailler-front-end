import { createContext, useRef, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.8:8765"; // Replace with your server URL
export const SocketContext = createContext(null);

export const SocketProvider = ({ token, children }) => {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const userVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerConnection = useRef(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    console.log("🔄 useEffect triggered! Token:", token);

    if (!token) {
      console.warn("🚨 No token provided. Skipping WebSocket connection.");
      return;
    }

    const sessionId = localStorage.getItem("socket_session_id");

    console.log("🔗 Connecting to WebSocket...");
    const newSocket = io(SOCKET_URL, {
      query: { token, sessionId },
      transports: ["websocket"],
      reconnection: true, // ✅ Enable auto-reconnection
      reconnectionAttempts: 5, // ✅ Retry 5 times if disconnected
      reconnectionDelay: 2000, // ✅ Delay 2 seconds between attempts
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket with ID:", newSocket.id);
      newSocket.emit("register_client", username);
      localStorage.setItem("socket_session_id", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("callUser", (data) => {
      console.log("📞 Incoming call:", data);
      setIncomingCall(data);
    });

    newSocket.on("disconnect", () => {
      console.warn("❌ Disconnected from WebSocket, attempting reconnection...");
    });

    return () => {
      console.log("🛑 Cleaning up WebSocket connection...");
      newSocket.disconnect();
      setSocket(null);
    };
  }, [token]);

  // Function to accept call
  const acceptCall = async () => {
    try {
      console.log("🎥 Getting media...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(mediaStream)

      setStream(mediaStream);
      if (userVideo.current) {
        userVideo.current.srcObject = mediaStream;
      }

      console.log("✅ Call accepted, starting WebRTC connection...");
      setIncomingCall(null);

      // Initialize WebRTC Peer Connection
      peerConnection.current = new RTCPeerConnection();

      // Add local stream tracks
      mediaStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, mediaStream);
      });

      // When receiving remote stream, display it
      peerConnection.current.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      // Send offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      if (socket) {
        socket.emit("answerCall", { offer });
      } else {
        console.error("⚠️ Socket is null, unable to answer call.");
      }

    } catch (error) {
      console.error("❌ Error accepting call:", error);
    }
  };

  // Function to reject call
  const rejectCall = () => {
    console.log("❌ Call rejected");
    setIncomingCall(null);
  };

  return (
    <SocketContext.Provider
      value={{ socket, stream, userVideo, remoteVideo, incomingCall, acceptCall, rejectCall }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to get socket instance safely
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     console.warn("⚠️ useSocket called outside of SocketProvider!");
//     return null;
//   }
//   return context.socket;
// };

// Custom hook for accessing media stream
export const useMediaStream = () => {
  const context = useContext(SocketContext);
  return { 
    stream: context?.stream, 
    userVideo: context?.userVideo, 
    remoteVideo: context?.remoteVideo 
  };
};

// Custom hook for handling calls
export const useCallHandler = () => {
  const context = useContext(SocketContext);
  return { 
    incomingCall: context?.incomingCall, 
    acceptCall: context?.acceptCall, 
    rejectCall: context?.rejectCall 
  };
};