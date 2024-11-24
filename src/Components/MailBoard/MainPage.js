import React, { useEffect, useState } from "react";
import FolderSidebar from "../MailComponent/FolderSidebar";
import EmailList from "../MailComponent/EmailList";
import EmailContent from "../MailComponent/EmailContent";
import HeaderPage from "../Header/HeaderPage";
import SideMenuPage from "../SideMenu/SideMenuPage";
import EmailToolbar from "../MailComponent/EmailToolbar";
import NewMail from "../MailComponent/NewMail";
import config from "../../config";

// import { Container } from './styles';

function MailBoard() {
  const [emails, setEmails] = useState([
    {
      from: "Nidhi Mishra",
      subject: "Changing the timings",
      time: "11:09 AM",
      content: "Details about the meeting.",
    },
    {
      from: "Google Cloud",
      subject: "Gen AI Exchange Hackathon",
      time: "6:11 AM",
      content: "Submit your solutions.",
    },
    // Add more emails
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isDialogOpen, setParentState] = useState(false);
  // const [parentState, setParentState] = useState("Initial State");

  const handleStateChange = () => {
    setParentState((prevState) => !prevState);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <>
      <HeaderPage />
      <div className="container-fluid">
        <div style={{ width: "97.5%", marginLeft: "3rem" }}>
          <EmailToolbar onShowDiv={handleStateChange} />
        </div>
        <div className="row">
          <SideMenuPage />
          <FolderSidebar />
          <EmailList emails={emails} onEmailClick={handleEmailClick} />
          <EmailContent selectedEmail={selectedEmail} />
          {isDialogOpen && <NewMail onShowDiv={handleStateChange} />}
        </div>
      </div>
    </>
  );
}

export default MailBoard;
