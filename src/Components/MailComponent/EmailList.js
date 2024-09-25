import React from 'react';
import "./MailComponent.css";
const EmailList = ({ emails, onEmailClick }) => {
  return (
    <div className="col-3 p-1 mail-box-list" style={{}}>
      {emails.map((email, index) => (
        <div 
          key={index} 
          className="list-group-item list-group-item-action mail-box"
          onClick={() => onEmailClick(email)}
        >
          <div className="d-flex justify-content-between">
            <h6 className="mb-1">{email.from}</h6>
            <small>{email.time}</small>
          </div>
          <p className="mb-1">{email.subject}</p>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
