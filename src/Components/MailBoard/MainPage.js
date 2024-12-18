import React, { useEffect, useState } from "react";
import FolderSidebar from "../MailComponent/FolderSidebar";
import EmailList from "../MailComponent/EmailList";
import EmailContent from "../MailComponent/EmailContent";
import HeaderPage from "../Header/HeaderPage";
import SideMenuPage from "../SideMenu/SideMenuPage";
import EmailToolbar from "../MailComponent/EmailToolbar";
import NewMail from "../MailComponent/NewMail";
import axios from "axios";
import config from "../../config";
import ChatMain from "../ChatComponent/ChatMain";
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

function MailBoard() {
  const navigate = useNavigate();
  
  // const [emails, setEmails] = useState([
  //   {
  //     from: "Nidhi Mishra",
  //     subject: "Changing the timings",
  //     time: "11:09 AM",
  //     content: "Details about the meeting.",
  //   },
  //   {
  //     from: "Google Cloud",
  //     subject: "Gen AI Exchange Hackathon",
  //     time: "6:11 AM",
  //     content: "Submit your solutions.",
  //   },
  //   // Add more emails
  // ]);
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const [emailsData, setEmails] = useState([])
  useEffect(()=>{
    let configapi = {
      method: 'get',
      maxBodyLength: Infinity,
      url: config.api.url+'/api/email?email='+username+'&action=fetch_emails&folder=new',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
    };
    
    axios.request(configapi)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setEmails(response.data.emails)
      let configapi_1 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: config.api.url+'/api/email?email='+username+'&action=fetch_emails&folder=cur',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
      };
      
      axios.request(configapi_1)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // setEmails(response.data.emails)
        setEmails((prevEmails) => [...prevEmails, ...response.data.emails])
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.statusText)
      if(error.response.statusText === "UNAUTHORIZED")
      {
        navigate('/login');
      }
    });
  },[]);

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
          {console.log(emailsData)}
          <EmailList emailsData={emailsData} onEmailClick={handleEmailClick} />
          <EmailContent selectedEmail={selectedEmail} />
          {isDialogOpen && <NewMail onShowDiv={handleStateChange} />}
          <ChatMain />
        </div>
      </div>
    </>
  );
}

export default MailBoard;
