import React from 'react';
import EmailToolbar from './EmailToolbar';
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const EmailContent = ({ selectedEmail }) => {
 const PlainTextToHTML=({ plainText })=> {
    const formatText = (text) => {
      // Convert new lines to <br />
      let formattedText = text.replace(/\n/g, '<br />');
  
      // Convert URLs into <a> tags (for example, links like http://example.com)
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      formattedText = formattedText.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
  
      // Convert image URLs into <img> tags (if the plain text contains image URLs)
      const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|bmp))/g;
      formattedText = formattedText.replace(imageRegex, (url) => {
        return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
      });
  
      return formattedText;
    };

    
  
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: formatText(plainText),
        }}
      />
    );
  }
  const dateConvert = (utcTime) =>{
    const date = new Date(utcTime);

  // Convert it to the local time zone
  const localTime = date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      return localTime
    }
    const EmailHover = ({ from }) => {
      // Extract the name and email using a regular expression
      const emailRegex = /^(.*)\s<([^>]+)>$/;
      const match = from.match(emailRegex);
    
      const name = match ? match[1] : from; // Extract name
      const email = match ? match[2] : ''; // Extract email
    
      return (
        <div className="email-container">
          <span className="name">{name}</span>
          {email && <span className="email">{` <${email}>`}</span>}
        </div>
      );
    };
  return (
    <div className="col-7 p-3 custom-scrollbar" style={{    overflowY: "auto",maxHeight: "83vh"}}>
      {/* {selectedEmail} */}
      {selectedEmail ? (
        <>
        <div>
          <h5>{selectedEmail.subject}</h5>
          <p className="text-muted"><EmailHover from={selectedEmail.from} /> - {dateConvert(selectedEmail.date)}</p>
          <hr />
          {/* <PlainTextToHTML plainText={selectedEmail.body} /> */}
          <p>{parse(DOMPurify.sanitize(selectedEmail.body))}</p>
          <button className="btn btn-outline-primary">Trust Sender</button>
        </div>
        </>
      ) : (
        <p className="text-muted">Select an email to view content</p>
      )}
    </div>
  );
};

export default EmailContent;
