import React, { useState, useEffect } from 'react';
import './SideMenu.css'
import { useNavigate } from 'react-router-dom';
import { IoApps } from 'react-icons/io5'; // Import the icon from react-icons
import { MdHome } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import config from '../../config';

export default function SideMenuPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  // Use effect to control showing text based on expansion
  useEffect(() => {
    let timer;
    if (isExpanded) {
      setTimeout(()=>{
        setShowText(true); // Show text immediately when expanded
    },400)
    
    } else {
      timer = setTimeout(() => {
        setShowText(false); // Delay hiding text when collapsing
      }, 400); // Match this delay with the collapse animation duration
    }
    return () => clearTimeout(timer); // Cleanup timeout on unmount or state change
  }, [isExpanded]);

  const handleMouseOver = () => {
    setIsExpanded(true); // Expand the div on mouse over
  };

  const handleMouseLeave = () => {
    setShowText(false);
    setIsExpanded(false); // Shrink the div on mouse leave
  };
  const settings = ()=>{
    navigate('/settings')
  }
  const showInbox = (item)=>{
    const url = "/"+item
    console.log(url)
    navigate(url)
  }
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    try {
      // Call the logout API
      await axios.post(config.api.url+'/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // On successful logout, remove the token from localStorage
      localStorage.removeItem('authToken');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data : error);
    }
  };
  return (
    <div
      className={`animated-div ${isExpanded ? 'expanded' : 'shrinked'}`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      // style={{ width: isExpanded ? '300px' : '50px', transition: 'width 0.3s ease' }} // Inline width transition
    >
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <div onClick={()=>showInbox("apps")}>
            <IoApps color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Apps</div>}
          </div>
          <div style={{clear:"both"}}></div>
        </li>
        <li> <div onClick={()=>showInbox("inbox")}>
            <MdHome color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Home</div>}
          </div>
          <div style={{clear:"both"}}></div></li>
        <li> <div onClick={()=>showInbox("profile")}>
            <FaCircleUser color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Profile</div>}
        </div>
          <div style={{clear:"both"}}></div></li>
        <li> <div onClick={()=>showInbox("schedule")}>
            <RiCalendarScheduleFill  color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Schedule</div>}
        </div>
          <div style={{clear:"both"}}></div></li>
        <li> <div onClick={()=>showInbox("chats")}>
            <PiChatsFill  color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Chats</div>}
          </div>
          <div style={{clear:"both"}}></div></li>
          <li> <div onClick={()=>showInbox("settings")}>
            <IoIosSettings color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Settings</div>}
          </div>
          <div style={{clear:"both"}}></div></li>
          <li> <div onClick={handleLogout}>
            <BiLogOutCircle color='#fff' size={25} style={{ margin: '0.5rem',float:"left" }} />
            {showText && <div style={{ fontSize: '18px', marginTop:"0.5rem", color: '#fff',float:"left" }}>Logout</div>}
          </div>
          <div style={{clear:"both"}}></div></li> 
      </ul>
    </div>
  );
}