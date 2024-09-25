import React from 'react';
import EmailToolbar from './EmailToolbar';

const EmailContent = ({ selectedEmail }) => {
  return (
    <div className="col-7 p-3">
      {selectedEmail ? (
        <>
        <div>
          <h5>{selectedEmail.subject}</h5>
          <p className="text-muted">{selectedEmail.from} - {selectedEmail.time}</p>
          <hr />
          <p>{selectedEmail.content}</p>
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
