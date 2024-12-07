import React, { useState } from 'react';
import "./MailComponent.css";
const EmailList = ({ emailsData, onEmailClick }) => {
  const [selectedEmails, setSelectedEmails] = useState({}); // State to track selected emails

   // Handle email selection
   const handleCheckboxChange = (email, isChecked) => {
    setSelectedEmails((prev) => ({
      ...prev,
      [email.id]: isChecked, // Assume `email.id` is unique for each email
    }));
  };

  // console.log(emailsData)
  const EmailDisplay = ({ from, date }) => {
    // Extract the name using a regular expression
    const emailRegex = /^(.*)\s<([^>]+)>$/;
    const match = from.match(emailRegex);
  
    const name = match ? match[1] : from; // Extract name
    const formattedDate = new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }); // Convert date to local time format
  
    return (
      <div className="email-container d-flex justify-content-between" >
         <div className="name">{name}</div>
        <div><small className="date-time"> - {formattedDate}</small></div>
        </div>
    );
  };
  return (
    <div className="col-3 p-1 mail-box-list  custom-scrollbar" style={{}}>
       {/* <h2>Emails for: {emailsData}</h2> */}
            {/* {emailsData.map((email, index) => (
                <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{email.subject}</h3>
                    <p><strong>From:</strong> {email.from}</p>
                    <p><strong>To:</strong> {email.to}</p>
                    <p><strong>Date:</strong> {email.date}</p>
                  <p>{email.body}</p> 
                </div>
            ))} */}
      {emailsData.map((email, index) => (
        <div 
          key={index} 
          className="list-group-item list-group-item-action mail-box"
          onClick={() => {onEmailClick(email)
                      handleCheckboxChange(email, true); // Mark as selected on email click
            }}
        >
          <div className="d-flex justify-content-left mail-list">
            {/* <h6 className="mb-1">{email.from}</h6>
            <small>{email.time}</small> */}
                <input
              type="checkbox"
              checked={!!selectedEmails[email.id]} // Check if the email is selected
              onChange={(e) =>
                handleCheckboxChange(email, e.target.checked)
              }
              onClick={(e) => e.stopPropagation()} // Prevent triggering email click
            />
               <div>
                  <EmailDisplay from={email.from} date={email.date} />
                  <p className="mb-1">{email.subject}</p>
                </div>
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default EmailList;
