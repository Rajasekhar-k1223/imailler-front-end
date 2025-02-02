import React, { useState } from 'react';
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


const App = () => {
  // const [emails, setEmails] = useState([
  //   { from: 'Nidhi Mishra', subject: 'Changing the timings', time: '11:09 AM', content: 'Details about the meeting.' },
  //   { from: 'Google Cloud', subject: 'Gen AI Exchange Hackathon', time: '6:11 AM', content: 'Submit your solutions.' },
  //   // Add more emails
  // ]);

  // const [selectedEmail, setSelectedEmail] = useState(null);

  // const handleEmailClick = (email) => {
  //   setSelectedEmail(email);
  // };

  return (
    <BrowserRouter>
    {/* <Routes>

        <Route index element={<WelcomPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createDomain' element={<CreateDomain />} />
        <Route path='/domainDetails' element={<DomainDetails />} />
        <Route path='/getMXCname' element={<GetMXCname />} />
        

      </Routes> */}
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<WelcomPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/aboutus" element={<AboutUs />} />
      {/* <Route path="/dashboard" element={<MailBoard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<UserProfile />} /> */}

      {/* Protected Routes */}
      <Route
        path="/inbox"
        element={<ProtectedRoute element={Inbox} />}
      />
      <Route
        path="/sent"
        element={<ProtectedRoute element={Sent} />}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute element={Settings} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={UserProfile} />}
      />
      {/* <Route
        path="/getMXCname"
        element={<ProtectedRoute element={GetMXCname} />}
      /> */}
    </Routes>
      </BrowserRouter>
  );
};

export default App;
