import React from 'react';
import "./MailComponent.css";
const FolderSidebar = () => {
  const folders = ['Inbox', 'Drafts', 'Sent Items', 'Deleted Items', 'Junk Email', 'Archive'];
  
  return (
    <div className="col-2 bg-light p-3 mail-tab">
      <ul className="list-group">
        {folders.map((folder, index) => (
          <li key={index} className="list-group-item">
            {folder}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderSidebar;
