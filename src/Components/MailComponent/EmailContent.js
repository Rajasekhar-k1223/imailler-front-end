// import React from 'react';
// import EmailToolbar from './EmailToolbar';
// import parse from "html-react-parser";
// import DOMPurify from "dompurify";
// import plaintohtml from "markdown-to-htm"
// // const EmailContent = ({ selectedEmail }) => {
// //  const PlainTextToHTML=({ plainText })=> {
// //     const formatText = (text) => {
// //       // Convert new lines to <br />
// //       let formattedText = text.replace(/\n/g, '<br />');
  
// //       // Convert URLs into <a> tags (for example, links like http://example.com)
// //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// //       formattedText = formattedText.replace(urlRegex, (url) => {
// //         return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
// //       });
  
// //       // Convert image URLs into <img> tags (if the plain text contains image URLs)
// //       const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|bmp))/g;
// //       formattedText = formattedText.replace(imageRegex, (url) => {
// //         return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
// //       });
  
// //       return formattedText;
// //     };

    
  
// //     return (
// //       <div
// //         dangerouslySetInnerHTML={{
// //           __html: formatText(plainText),
// //         }}
// //       />
// //     );
// //   }
// //   const dateConvert = (utcTime) =>{
// //     const date = new Date(utcTime);

// //   // Convert it to the local time zone
// //   const localTime = date.toLocaleString('en-US', {
// //         weekday: 'short',
// //         year: 'numeric',
// //         month: 'short',
// //         day: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         second: '2-digit',
// //         hour12: true,
// //       });
// //       return localTime
// //     }
// //     const EmailHover = ({ from }) => {
// //       // Extract the name and email using a regular expression
// //       const emailRegex = /^(.*)\s<([^>]+)>$/;
// //       const match = from.match(emailRegex);
    
// //       const name = match ? match[1] : from; // Extract name
// //       const email = match ? match[2] : ''; // Extract email
    
// //       return (
// //         <div className="email-container">
// //           <span className="name">{name}</span>
// //           {email && <span className="email">{` <${email}>`}</span>}
// //         </div>
// //       );
// //     };
// //   return (
// //     <div className="col-7 p-3 custom-scrollbar" style={{    overflowY: "auto",maxHeight: "83vh"}}>
// //       {/* {selectedEmail} */}
// //       {selectedEmail ? (
// //         <>
// //         <div>
// //           <h5>{selectedEmail.subject}</h5>
// //           <p className="text-muted"><EmailHover from={selectedEmail.from} /> - {dateConvert(selectedEmail.date)}</p>
// //           <hr />
// //           {/* <PlainTextToHTML plainText={selectedEmail.body} /> */}
// //           <p>{parse(DOMPurify.sanitize(selectedEmail.html_body))}</p>
// //           <button className="btn btn-outline-primary">Trust Sender</button>
// //         </div>
// //         </>
// //       ) : (
// //         <p className="text-muted">Select an email to view content</p>
// //       )}
// //     </div>
// //   );
// // };

// const EmailContent = ({selectedEmail}) => {
//   // console.log(selectedEmail.plain_body)
//   // const emailData = selectedEmail

//   const PlainTextToHTML = ({ plainText }) => {
//     const formatText = (text) => {
//       // Convert new lines to <br />
//       let formattedText = text.replace(/\n/g, '<br />');
  
//       // Convert URLs into <a> tags (for example, links like http://example.com)
//       const urlRegex = /(https?:\/\/[^\s]+)/g;
//       formattedText = formattedText.replace(urlRegex, (url) => {
//         return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
//       });
  
//       // Convert image URLs into <img> tags (if the plain text contains image URLs)
//       const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|bmp))/g;
//       formattedText = formattedText.replace(imageRegex, (url) => {
//         return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
//       });
  
//       return formattedText;
//     };
//      return (
//     <div
//       dangerouslySetInnerHTML={{
//         __html: formatText(plainText),
//       }}
//     />
//   );

//   }

//   // Function to parse the plain_body into structured sections
//   const parseEmailReplies = (plainBody) => {
//     // Split the text by "On ... wrote:" patterns to create groups
//     const replySections = plainBody.split(/(?:\nOn .*?wrote:\n)/);

//     return replySections.map((section, index) => {
//       const [date, from, ...messageLines] = section.trim().split("\n");

//       // Extract date and sender if present, otherwise use defaults
//       const messageDate = date?.includes("at") ? date : "Unknown Date";
//       const sender = from?.includes("<") ? from : selectedEmail.from;
//       const message = messageLines.join("\n");

//       return (
//         <div
//           key={index}
//           style={{
//             borderBottom: "1px solid #ddd",
//             padding: "10px 0",
//           }}
//         >
//           <p>
//             <strong>Date:</strong> {messageDate}
//           </p>
//           <p>
//             <strong>From:</strong> {sender}
//           </p>
//           <div style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
//             {message || "No content"}
//           </div>
//         </div>
//       );
//     });
//   };
//     const dateConvert = (utcTime) =>{
//     const date = new Date(utcTime);

//   // Convert it to the local time zone
//   const localTime = date.toLocaleString('en-US', {
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//       });
//       return localTime
//     }
//     const EmailHover = ({ from }) => {
//       // Extract the name and email using a regular expression
//       const emailRegex = /^(.*)\s<([^>]+)>$/;
//       const match = from.match(emailRegex);
    
//       const name = match ? match[1] : from; // Extract name
//       const email = match ? match[2] : ''; // Extract email
    
//       return (
//         <div className="email-container">
//           <span className="name">{name}</span>
//           {email && <span className="email">{` <${email}>`}</span>}
//         </div>
//       );
//     };
//   return (
//     <div className="col-7 p-3 custom-scrollbar" style={{ overflowY: "auto", maxHeight: "83vh" }}>
//       {selectedEmail ? (
//         <>
//       <h2>Email Viewer</h2>
//       <p>
//         <strong>Subject:</strong> {selectedEmail.subject}
//       </p>
//       <p>
//         <strong>From:</strong> {selectedEmail.from}
//       </p>
//       <p>
//         <strong>To:</strong> {selectedEmail.to}
//       </p>
//       <p>
//         <strong>Date:</strong> {selectedEmail.date}
//       </p>
//       <div style={{ marginTop: "20px" }}>
//         <strong>Message Thread:</strong>
//         {parseEmailReplies(selectedEmail.plain_body)}
//           </div>
//           <div style={{ marginTop: "20px" }}>
//           <PlainTextToHTML plainText={selectedEmail.plain_body} />
//           </div>
//         </>
//       ) : (
//         <p className="text-muted">Select an email to view content</p>
//       )} 
//       { console.log("test email view")}
//       { console.log(selectedEmail)}
//        {/* {selectedEmail ? (
//         <>
//         <div>
//           <h5>{selectedEmail.subject}</h5>
//           <p className="text-muted"><EmailHover from={selectedEmail.from} /> - {dateConvert(selectedEmail.date)}</p>
//           <hr /> */}
//           {/* <PlainTextToHTML plainText={selectedEmail.body} /> */}
//             {/* <p>{parse(DOMPurify.sanitize(selectedEmail.html_body))}</p>
//              <div style={{ marginTop: "20px" }}>
//         <strong>Message Thread:</strong>
//         {parseEmailReplies(selectedEmail.plain_body)}
//       </div> */}
//           {/* <button className="btn btn-outline-primary">Trust Sender</button> */}
//         {/* </div>
//         </>
//       ) : (
//         <p className="text-muted">Select an email to view content</p>
//       )} */}
//     </div>
//   );
// };

// export default EmailContent;
import React, { useState } from 'react';
import SanitizeHtml from './SanitizeHtml';
const EmailContent = ({ selectedEmail }) => {
  const [showAll, setShowAll] = useState(false);

  /**
   * 🧹 **Parse Email Replies**
   * Cleans the email body by removing markers and separating messages into chunks.
   */
  // const parseEmailReplies = (plainBody) => {
  //   const cleanedBody = plainBody
  //     .replace(/^>+/gm, '') // Remove reply markers (`>`)
  //     .replace(/On .*wrote:/g, '') // Remove patterns like 'On ... wrote:'
  //     .replace(/^\s+/gm, ''); // Remove leading spaces on each line

  //   return cleanedBody.split(/\n\n/).filter((section) => section.trim() !== '');
  // };

  /**
   * 🖌️ **Format Text**
   * Converts URLs and image links into clickable elements.
   */
  const formatText = (text) => {
    let formattedText = text.replace(/\n/g, '<br />');

    // Match URLs and replace them with clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formattedText = formattedText.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    // Match image URLs and render them as images
    const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|bmp))/g;
    formattedText = formattedText.replace(imageRegex, (url) => {
      return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; margin-top: 5px;" />`;
    });

    return formattedText;
  };

  /**
   * 📅 **Date Conversion**
   * Converts UTC time to local date-time format.
   */
  const dateConvert = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  /**
   * 📨 **Email Hover Display**
   * Extracts and displays sender name and email separately.
   */
  const EmailHover = ({ from }) => {
    const emailRegex = /^(.*)\s<([^>]+)>$/;
    const match = from.match(emailRegex);
    const name = match ? match[1] : from;
    const email = match ? match[2] : '';

    return (
      <div className="email-container">
        <span className="name" style={{ fontWeight: 'bold' }}>{name}</span>
        {email && <span className="email" style={{ color: '#6c757d' }}>{` <${email}>`}</span>}
      </div>
    );
  };

  // Extract and clean replies
  // const replies = selectedEmail ? parseEmailReplies(selectedEmail.plain_body) : [];

  return (
    <div className="col-7 p-3 custom-scrollbar" style={{ overflowY: 'auto', maxHeight: '83vh' }}>
      {selectedEmail ? (
        <>
          {/* 📧 Email Subject */}
          <h5 style={{ marginBottom: '10px' }}>{selectedEmail.subject}</h5>
          
          {/* 👤 Email Sender Details */}
          <p className="text-muted">
            <EmailHover from={selectedEmail.from} /> - {dateConvert(selectedEmail.date)}
          </p>
          <hr />

          <SanitizeHtml htmlContent={selectedEmail.html_body} />
        </>
      ) : (
        <p className="text-muted">Select an email to view content</p>
      )}
      
    </div>
  );
};

export default EmailContent;
