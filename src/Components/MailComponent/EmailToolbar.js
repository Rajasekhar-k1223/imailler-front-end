import React, { useState,useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  FaEnvelope,
  FaTrash,
  FaArchive,
  FaShieldAlt,
  FaBroom,
  FaFolder,
  FaReply,
  FaReplyAll,
  FaForward,
  FaBolt,
  FaEnvelopeOpenText,
  FaTags,
  FaFlag,
  FaClock,
  FaThumbtack,
  FaPrint,
  FaRedo,
} from "react-icons/fa";

const EmailToolbar = ({ onShowDiv, selectedEmail }) => {
  const [disabled, setDisabled] = useState(true)
  console.log(selectedEmail)
  useEffect(() => {
    if (selectedEmail) {
      console.log(selectedEmail._id)
      setDisabled(false); // Enable buttons if selectedEmail exists
    } else {
      setDisabled(true); // Disable buttons if selectedEmail is null
    }
  }, [selectedEmail]);

  // console.log(selectedEmail !== null ? setdisabled(false):setdisabled(true))
  // const changeParentState = () => {
  //   onShowDiv(true);
  // };
  return (
    <div className="d-flex align-items-center p-2 bg-light border ml-5">
      <Button variant="primary" className="me-2" onClick={onShowDiv}>
        <FaEnvelope /> New mail
      </Button>

      <Button title="Delete" className={`me-2 ${disabled ? 'btn btn-primary' : 'btn btn-danger'}`} disabled={disabled} >
        Delete
      </Button>
      <Button variant="light" className="me-2" disabled='true'>
        <FaArchive /> Archive
      </Button>
      <DropdownButton title="Report" variant="light" className="me-2" disabled='true'>
        <Dropdown.Item>Spam</Dropdown.Item>
        <Dropdown.Item>Phishing</Dropdown.Item>
      </DropdownButton>
      <Button variant="light" className="me-2" disabled='true'>
        <FaBroom /> Sweep
      </Button>
      <DropdownButton title="Move to" variant="light" className="me-2" disabled='true'>
        <Dropdown.Item>Folder 1</Dropdown.Item>
        <Dropdown.Item>Folder 2</Dropdown.Item>
      </DropdownButton>
      <Button variant="light" className="me-2" disabled='true'>
        <FaReply /> Reply
      </Button>
      <Button variant="light" className="me-2" disabled='true'>
        <FaReplyAll /> Reply all
      </Button>
      <Button variant="light" className="me-2" disabled='true'>
        <FaForward /> Forward
      </Button>
      <DropdownButton title="Quick steps" variant="light" className="me-2" disabled='true'>
        <Dropdown.Item>Step 1</Dropdown.Item>
        <Dropdown.Item>Step 2</Dropdown.Item>
      </DropdownButton>
      <Button variant="light" className="me-2" disabled='true'>
        <FaEnvelopeOpenText /> Read/Unread
      </Button>
      <DropdownButton title="Tag" variant="light" className="me-2" disabled='true'>
        <Dropdown.Item>Tag 1</Dropdown.Item>
        <Dropdown.Item>Tag 2</Dropdown.Item>
      </DropdownButton>
      <Button variant="light" className="me-2" disabled='true'>
        <FaFlag /> Flag
      </Button>
      {/* <DropdownButton title="Reminder" variant="light" className="me-2">
        <Dropdown.Item>Set Reminder</Dropdown.Item>
      </DropdownButton> */}
      {/* <Button variant="light" className="me-2">
        <FaThumbtack /> Pin
      </Button>
      <Button variant="light" className="me-2">
        <FaPrint /> Print
      </Button>
      <Button variant="light" className="me-2">
        <FaRedo /> Redo
      </Button> */}
    </div>
  );
};

export default EmailToolbar;
