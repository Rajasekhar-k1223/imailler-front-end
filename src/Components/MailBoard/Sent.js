import React, { useEffect, useState,useRef  } from "react";
import FolderSidebar from "../MailComponent/FolderSidebar";
import EmailListSent from "../MailComponent/EmailListSent";
import EmailContent from "../MailComponent/EmailContent";
import HeaderPage from "../Header/HeaderPage";
import SideMenuPage from "../SideMenu/SideMenuPage";
import EmailToolbar from "../MailComponent/EmailToolbar";
import NewMail from "../MailComponent/NewMail";
import axios from "axios";
import config from "../../config";
import ChatMain from "../ChatComponent/ChatMain";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
// import { Container } from './styles';

const Sent=()=> {
  const navigate = useNavigate();
  
  // const [email setEmails] = useState([
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
  const [emailsData, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isDialogOpen, setParentState] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('Inbox'); // Default folder is 'Inbox'
  const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//   console.log(socketRef)
//   // if (!socketRef.current) {
//    console.log(socketRef)
//     // socketRef.on("connect", () => {
//     //   console.log("Connected to server");
//     //   socketRef.emit("register_client", username);
//     //   console.log("Connected to server");
//     // });

//     // socketRef.on("new_email", (data) => {
//     //   console.log("New email notification received:", data);
//     //   setEmails((prevEmails) => [...prevEmails, ...data.email_data])
//     //   setNotifications((prev) => [data.message, ...prev]);
//     // });

//     // socketRef.on("disconnect", () => {
//     //   console.log("Disconnected from server");
//     // });
//     //  return () => {
//     //   if (socketRef) socketRef.disconnect();
//     // };
// }, [socketRef]);
  useEffect(() => {
    const socketRef = io("http://192.168.1.10:8765", {
      query: { debug: "true" }, // Enable debug logs
      transports: ["websocket", "polling"] // Specify transports
    });
    console.log(socketRef)
     socketRef.on("connect", () => {
      console.log("Connected to server");
      socketRef.emit("register_client", username);
      console.log("Connected to server after connection");
    });

    socketRef.on("new_email", (data) => {
      console.log("New email notification received:", data);
      const newEmailData = [data.email_data]
      console.log(newEmailData)
      setEmails((prevEmails) => [...prevEmails, ...newEmailData])
      setNotifications((prev) => [data.message, ...prev]);
    });
    if (!selectedFolder) return;
    // console.log(selectedFolder)
    // if (selectedFolder === 'Inbox') {
      let configapi = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: config.api.url + '/api/email?email=' + username + '&action=fetch_emails&folder=new',
        url: config.api.url + '/api/sent-emails?email='+username,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      };
    
      axios.request(configapi)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setEmails(response.data)
          // let configapi_1 = {
          //   method: 'get',
          //   maxBodyLength: Infinity,
          //   url: config.api.url + '/api/email?email=' + username + '&action=fetch_emails&folder=cur',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization': 'Bearer ' + token
          //   },
          // };
      
          // axios.request(configapi_1)
          //   .then((response) => {
          //     console.log(JSON.stringify(response.data));
          //     // setEmails(response.data.emails)
          //     setEmails((prevEmails) => [...prevEmails, ...response.data.emails])
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.statusText)
          if (error.response.statusText === "UNAUTHORIZED") {
            navigate('/login');
          }
        });
    //}
    // else if (selectedFolder === 'Sent') { 
    //   window.history.pushState({}, "", `/${selectedFolder}`);
    //   console.log(selectedFolder)
    //   console.log(username)
    //   let configapi = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     // url: config.api.url + '/api/email?email=' + username + '&action=fetch_emails&folder=new',
    //     url: config.api.url + '/api/sent-emails?email='+username,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + token
    //     },
    //   };
    
    //   axios.request(configapi)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //       setEmails(response.data)
    //       })
    //     .catch((error) => {
    //       console.log(error);
    //       console.log(error.response.statusText)
    //       if (error.response.statusText === "UNAUTHORIZED") {
    //         navigate('/login');
    //       }
    //     });
    //     setEmails([])
    // }
    //  else if(selectedFolder === 'Draft') { 
    //     setEmails([])
    // }
    //  else if(selectedFolder === 'Deleted') { 
    //     setEmails([])
    // }
    //  else if(selectedFolder === 'Junk Email') { 
    //     setEmails([])
    // }
    //  else if(selectedFolder === 'Archive') { 
    //     setEmails([])
    // }
     
  },[selectedFolder]);
  const handleFolderSelect = (folder) => {
   console.log(folder)
   navigate("/"+folder.toLowerCase())
    // setSelectedFolder(folder);
  };

  // const [parentState, setParentState] = useState("Initial State");

  const handleStateChange = () => {
    setParentState((prevState) => !prevState);
  };

  const handleEmailClick = (email) => {
    console.log("state email")
    console.log(email)
    setSelectedEmail(email);
  };


  return (
    <>
      <HeaderPage />
      <div className="container-fluid">
        <div style={{ width: "97.5%", marginLeft: "3rem" }}>
          <EmailToolbar onShowDiv={handleStateChange} selectedEmail={selectedEmail}/>
        </div>
        <div className="row">
          <SideMenuPage />
          <FolderSidebar  selectFolder={handleFolderSelect} 
            selectedFolder={"Sent"} 
          />
          <EmailListSent emailsData={emailsData} onEmailClick={handleEmailClick} />
          <EmailContent selectedEmail={selectedEmail} />
          {isDialogOpen && <NewMail onShowDiv={handleStateChange} />}
          <ChatMain />
        </div>
      </div>
    </>
  );
}

export default Sent;
