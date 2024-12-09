import React from 'react';
import Header from "./Header/HeaderPage";
import email_format from '../assets/images/email_format.jpg';
import msg_sercvice from '../assets/images/messaging-services.jpg';
import imlr from '../assets/images/logo.png';
import '../App.css'
const WelcomPage = () => {
    return (
        <div style={{overflowY:"auto"}}>
            <Header />
            {/* <div className='container m-0'> */}
            <div className='row welcome-page'>
                <div className='col-md-4 col-sm-6 col-xs-6 p-5' >
                    <p className='space50'></p>
                    <img src={imlr} style={{width:"75px"}}/><p>Your Trusted Mail and Messaging Service</p>

                    <p><strong>IMaiLler.com</strong> is a robust and reliable platform that empowers users to send, receive, and manage electronic messages (emails), along with offering secure peer-to-peer messaging and chatting capabilities. It plays a vital role in enhancing personal, professional, and organizational communication.</p>
                    <button className='btn-read-more'>Read More</button>
                </div>
                <div className='col-md-8 p-3' >
                    <img src={email_format } style={{width:"100%"}}/>
                </div>
                <div className='col-md-6 p-3' >
                    <img src={msg_sercvice } style={{width:"100%"}}/>
                </div>
                <div className='col-md-6 col-sm-6 col-xs-6 p-5' >
                    <p className='space50'></p>
                    <img src={imlr} style={{width:"75px"}}/><p>Your Trusted Mail and Messaging Service</p>

                    <p style={{padding: "0rem 10rem 0rem 0rem"}}>Messaging refers to the process of sending and receiving text-based communication between users, typically over the internet, using various platforms or services. In the context of <strong>IMaiLler.com</strong>, messaging is an integral feature that allows users to exchange messages instantly, outside of traditional email.</p>
                    <button className='btn-read-more' style={{marginRight:'10rem'}}>Read More</button>
                </div>
                
                
            </div>
            <footer>
                @Copy 2024-2025
            </footer>
            </div>
        // </div>
    );
};

export default WelcomPage;