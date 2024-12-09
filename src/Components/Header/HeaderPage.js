import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate, useLocation} from "react-router-dom";
import './header.css';
import logo from '../../assets/images/logo.png'

export default function HeaderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
   // Function to close dropdown when clicking outside
   const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to listen for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
const signinPage = ()=>{
navigate("/login")
}
const signupPage = ()=>{
navigate("/signup")
}
const aboutusPage = ()=>{
navigate("/aboutus")
}
const contactusPage = ()=>{
navigate("/contactus")
}
const homePage = ()=>{
navigate("/")
}
  return (
    location.pathname === '/' ? <div className='header-mainPage'>
            <div className='header-inside'>
      <div className='head-logo'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='head-body'></div>
        <div className='head-right-side'>
          <div className='header-signin' onClick={signinPage}>Login</div>
        </div>
        <div className='head-right-side'>
          <div className='header-signin' onClick={signupPage}>SignUp</div>
        </div>
        
        <div className='head-right-side mr-5' style={{marginRight:'10rem'}}>
          <div className='header-signin' onClick={contactusPage}>Contact Us</div>
        </div>
        <div className='head-right-side' style={{marginRight:'5rem'}}>
          <div className='header-signin' onClick={aboutusPage}>About Us</div>
        </div>
        
        <div className='head-right-side' style={{marginRight:'5rem'}}>
          <div className='header-signin' onClick={homePage}>Home</div>
        </div>
        </div>

    </div>:
    <div className='header'>
      <div className='header-inside'>
      <div className='head-logo'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='head-body'></div>
        <div className='head-right-side'>

        <div className="user-info-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        User Info
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
        </div>
        </div>
        <div style={{clear:"both"}}></div>
    </div>
  )
}
