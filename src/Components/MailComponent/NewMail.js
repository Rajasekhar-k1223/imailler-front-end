// import React from "react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const NewMail = ({ onShowDiv }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  const [attachments, setAttachments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBodyChange = (value) => {
    setFormData({ ...formData, body: value });
  };

  const handleFileUpload = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSend = () => {
    console.log("Sending email with data:", formData, attachments);
    alert("Email sent!");
    // You would integrate an API here to send the email
  };
  //   const [formData, setFormData] = useState({
  //     to: "",
  //     cc: "",
  //     subject: "",
  //     message: "",
  //   });

  //   const [attachments, setAttachments] = useState([]); // Store uploaded files
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const handleFileUpload = (e) => {
  //     setAttachments([...e.target.files]); // Handle multiple file uploads
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!formData.to || !formData.subject || !formData.message) {
  //       alert("Please fill in all required fields (To, Subject, Message).");
  //       return;
  //     }

  //     setIsSubmitting(true);
  //     // Create form data to send to the backend
  //     const emailData = new FormData();
  //     emailData.append("to", formData.to);
  //     emailData.append("cc", formData.cc);
  //     emailData.append("subject", formData.subject);
  //     emailData.append("message", formData.message);

  //     // Attach files
  //     attachments.forEach((file, index) => {
  //       emailData.append(`attachments`, file); // Append each file
  //     });

  //     try {
  //       // Simulate sending email via API
  //       const response = await fetch("/api/send-mail", {
  //         method: "POST",
  //         body: emailData,
  //       });

  //       if (response.ok) {
  //         alert("Mail sent successfully!");
  //         setFormData({ to: "", cc: "", subject: "", message: "" });
  //         setAttachments([]);
  //       } else {
  //         alert("Failed to send email. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error sending email:", error);
  //       alert("An error occurred while sending email.");
  //     }

  //     setIsSubmitting(false);
  //   };

  const handleOpenDialog = () => {
    // setIsDialogOpen(true);
    console.log("NewMail");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      {/* <button onClick={handleOpenDialog}>Open Dialog</button> */}

      {/* {isDialogOpen && ( */}
      <div style={dialogStyle}>
        <div style={dialogContentStyle}>
          {/* <h2>Dialog Box</h2>
          <p>This is a simple dialog box triggered by a button click.</p> */}
          <button style={{ float: "right" }} onClick={onShowDiv}>
            X
          </button>
          <div
            style={{
              maxWidth: "100vw",
              maxHeight: "100%",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ textAlign: "left" }}>New Message</h3>
            <form>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  To:{" "}
                  <input
                    type="email"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Enter recipient email"
                    required
                    style={{
                      width: "90%",
                      padding: "8px",
                      marginTop: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Cc:{" "}
                  <input
                    type="email"
                    name="cc"
                    value={formData.cc}
                    onChange={handleChange}
                    placeholder="Enter CC emails (optional)"
                    style={{
                      width: "90%",
                      padding: "8px",
                      marginTop: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Bcc:{" "}
                  <input
                    type="email"
                    name="bcc"
                    value={formData.bcc}
                    onChange={handleChange}
                    placeholder="Enter BCC emails (optional)"
                    style={{
                      width: "90%",
                      padding: "8px",
                      marginTop: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Subject:{" "}
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter email subject"
                    style={{
                      width: "90%",
                      padding: "8px",
                      marginTop: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Message:
                </label>
                <ReactQuill
                  value={formData.body}
                  onChange={handleBodyChange}
                  style={{ height: "150px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Attachments:
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ marginTop: "5px" }}
                />
                {attachments.length > 0 && (
                  <ul style={{ marginTop: "10px" }}>
                    {attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="button"
                onClick={handleSend}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </div>

          {/* //   )} */}
          {/* <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h2>Send Mail</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label>To:</label>
                <input
                  type="email"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="Enter recipient email"
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>CC:</label>
                <input
                  type="email"
                  name="cc"
                  value={formData.cc}
                  onChange={handleChange}
                  placeholder="Enter CC emails (optional)"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                /> */}
          {/* </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    minHeight: "100px",
                  }}
                />
              </div> */}
          {/* <div style={{ marginBottom: "10px" }}>
                <label>Attachments:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ marginTop: "5px" }}
                />
                {attachments.length > 0 && (
                  <ul>
                    {attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Mail"}
              </button>
            </form>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

// Styles for dialog box
const dialogStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const dialogContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  width: "50%",
};

export default NewMail;
