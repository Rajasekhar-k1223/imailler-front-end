import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomPage from './Components/WelcomePage';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignUpForm';
import ProtectedRoute from './Components/Protected/ProtectedRoute';
import Inbox from './Components/MailBoard/Inbox';
import Settings from './Components/Settings/Settings';
import UserProfile from './Components/Profile/UserProfile';
import AboutUs from './Components/AboutUs';
import Sent from './Components/MailBoard/Sent';
import ScheduleMain from './Components/Schedule/ScheduleMain';
import ChatLayout from './Components/SubChat/ChatLayout';
import CallPopup from './Components/CallSystem/CallPopup';
import VideoCallScreen from './Components/CallSystem/VideoCallScreen';
import { SocketProvider } from './Context/SocketProvider';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  // const [emails, setEmails] = useState([
  //   { from: 'Nidhi Mishra', subject: 'Changing the timings', time: '11:09 AM', content: 'Details about the meeting.' },
  //   { from: 'Google Cloud', subject: 'Gen AI Exchange Hackathon', time: '6:11 AM', content: 'Submit your solutions.' },
  //   // Add more emails
  // ]);

  // const [selectedEmail, setSelectedEmail] = useState(null);

  // const handleEmailClick = (email) => {
  //   setSelectedEmail(email);
  // };
   useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <BrowserRouter>
      <SocketProvider token={token}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/inbox"
            element={<Inbox />
            }
          />
          <Route
            path="/sent"
            element={
                <Sent />
            }
          />
          <Route
            path="/schedule"
            element={
                <ScheduleMain />
            }
          />
          <Route
            path="/chats"
            element={
                <ChatLayout />
            }
          />
          <Route
            path="/settings"
            element={
                <Settings />
            }
          />
          <Route
            path="/profile"
            element={
                <UserProfile />
            }
          />
        </Routes>
         <CallPopup />
        <VideoCallScreen />
      </SocketProvider>
    </BrowserRouter>          

     
  );
};

export default App;
