import React, { useState } from 'react';
import "./MailComponent.css";
const EmailList = ({ emailsData, onEmailClick }) => {
  const [selectedEmails, setSelectedEmails] = useState({}); // State to track selected emails
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
   // Handle email selection
  //  const handleCheckboxChange = (email, isChecked) => {
  //   setSelectedEmails((prev) => ({
  //     ...prev,
  //     [email.id]: isChecked, // Assume `email.id` is unique for each email
  //   }));
  // };
  const handleCheckboxChange = (index, isChecked) => {
    let newSelectedIndices = [...selectedIndices];

    if (isChecked) {
      // Add to selectedIndices if checkbox is checked
      if (!newSelectedIndices.includes(index)) {
        newSelectedIndices.push(index);
      }
    } else {
      // Remove from selectedIndices if checkbox is unchecked
      newSelectedIndices = newSelectedIndices.filter((i) => i !== index);
       
    }
    if(newSelectedIndices.length === 0) {
        setActiveIndex(null);
            onEmailClick(null); 
        } else {
          setActiveIndex(index); // Highlight the active email
        }

    setSelectedIndices(newSelectedIndices);
  };
    const handleEmailClick = (index, email) => {
  let newSelectedIndices = [];

    if (newSelectedIndices.includes(index)) {
      // If the email is already selected, unselect it
      newSelectedIndices = newSelectedIndices.filter((i) => i !== index);
    } else {
      // Select the email if not selected
      newSelectedIndices.push(index);
    }

      setSelectedIndices(newSelectedIndices);
      console.log(newSelectedIndices.length)
    if (newSelectedIndices.length === 0) {
      setActiveIndex(null);

  } else {
    setActiveIndex(index); // Highlight the active email
     onEmailClick(email);
  }

    // Call external onEmailClick function
   
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
          className={`list-group-item list-group-item-action mail-box ${
            selectedIndices.includes(index) ? 'active' : ''
          }  ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleEmailClick(index, email)} // Toggle email selection on div click
        >
          { console.log(selectedIndices)}
          <div className="d-flex justify-content-left mail-list">
            <input
              type="checkbox"
              checked={selectedIndices.includes(index)} // Check if the email is selected by index
              onChange={(e) =>
                handleCheckboxChange(index, e.target.checked) // Handle checkbox change by index
              }
              onClick={(e) => e.stopPropagation()} // Prevent triggering email click on checkbox change
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
