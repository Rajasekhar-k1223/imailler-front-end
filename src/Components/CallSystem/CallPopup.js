import { useCallHandler } from "../../Context/SocketProvider";

const CallPopup = () => {
  const { incomingCall, acceptCall, rejectCall } = useCallHandler();
  console.log(incomingCall)

  if (!incomingCall) return null; // Hide if no call

  return (
    <div className="call-popup">
      <h2>📞 Incoming Call</h2>
      <p>From: {incomingCall.from}</p>
      <button onClick={acceptCall}>✅ Accept</button>
      <button onClick={rejectCall}>❌ Reject</button>
    </div>
  );
};

export default CallPopup;
