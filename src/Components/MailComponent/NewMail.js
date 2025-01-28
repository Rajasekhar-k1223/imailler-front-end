// import React from "react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import config from "../../config";
const NewMail = ({ onShowDiv }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId:"",
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const [attachments, setAttachments] = useState([]);

  const handleChangeto = (e) => {
    const { name, value } = e.target;
    console.log({[name]: value })
    setFormData({ ...formData, [name]: value });
  };
  const handleChangecc = (e) => {
    const { name, value } = e.target;
    console.log({[name]: value })
    setFormData({ ...formData, [name]: value });
  };
  const handleChangebcc = (e) => {
    const { name, value } = e.target;
    console.log({[name]: value })
    setFormData({ ...formData, [name]: value });
  };
  const handleChangesubject = (e) => {
    const { name, value } = e.target;
    console.log({[name]: value })
    setFormData({ ...formData, [name]: value });
  };
  const handleBodyChange = (value) => {
    setFormData({ ...formData, body: value });
  };

  const handleFileUpload = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSend = (e) => {
    console.log("Sending email with data:", formData, attachments);
    e.preventDefault();

       
  
        setIsSubmitting(true);
        // Create form data to send to the backend
        const emailData = new FormData();
        emailData.append("userId", userId);
        emailData.append("to_email", formData.to);
        emailData.append("cc_email", formData.cc);
        emailData.append("subject", formData.subject);
        emailData.append("body", formData.body);
        // if (!formData.to || !formData.subject || !formData.message) {
        //   alert("Please fill in all required fields (To, Subject, Message).");
        //   return;
        // }
        // Attach files
        attachments.forEach((file, index) => {
          emailData.append(`attachments`, file); // Append each file
        });
        console.log(emailData);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://mailapi.imailler.com/api/send_email',
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+token
          },
          data : emailData
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if(response.data.status === 200){
            onShowDiv()
          }

        })
        .catch((error) => {
          console.log(error);
        });
        // try {
        //   // Simulate sending email via API
        //   const response = await fetch("/api/send-mail", {
        //     method: "POST",
        //     body: emailData,
        //   });
  
        //   if (response.ok) {
        //     alert("Mail sent successfully!");
        //     setFormData({ to: "", cc: "", subject: "", message: "" });
        //     setAttachments([]);
        //   } else {
        //     alert("Failed to send email. Please try again.");
        //   }
        // } catch (error) {
        //   console.error("Error sending email:", error);
        //   alert("An error occurred while sending email.");
        // }
  
        // setIsSubmitting(false);
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
          <button style={{float: "right",position: "relative",bottom:" 0.7rem",borderRadius: "2rem" }} onClick={onShowDiv}>
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
            <form >
            <div style={{ marginBottom: "10px" }}  class="form-horizontal">
            <div class="form-group mb-2">
                <label class="row">
                  <span class="col-md-1 control-label" style={{width:'9%'}}>To</span>
                  <span class="col-md-1 control-label" style={{width:'5%'}}>:</span>
                  <div class="col-md-10 mail-fields">
                    <input class="form-control" type="email"
                          name="to"
                          value={formData.to}
                          onChange={handleChangeto}
                          placeholder="Enter recipient email"
                          required
                          style={{
                            flex: "1",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}/>
                  </div>
                </label>
            </div>
            <div class="form-group mb-2">
                <label class="row">
                  <span class="col-md-1 control-label" style={{width:'9%'}}>Cc</span>
                  <span class="col-md-1 control-label" style={{width:"5%"}}>:</span>
                  <div class="col-md-10 mail-fields">
                    <input class="form-control" type="email"
                        name="cc"
                        value={formData.cc}
                        onChange={handleChangecc}
                        placeholder="Enter recipient email"
                        required
                        style={{
                          flex: "1",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}/>
                  </div>
                </label>
            </div>
            <div class="form-group mb-2">
                <label class="row">
                  <span class="col-md-1 control-label" style={{width:'9%'}}>Bcc</span>
                  <span class="col-md-1 control-label" style={{width:"5%"}}>:</span>
                  <div class="col-md-10 mail-fields">
                    <input class="form-control" type="email"
                        name="bcc"
                        value={formData.bcc}
                        onChange={handleChangebcc}
                        placeholder="Enter recipient email"
                        required
                        style={{
                          flex: "1",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}/>
                  </div>
                </label>
            </div>
            <div class="form-group mb-2">
                <label class="row">
                  <span class="col-md-1 control-label" style={{width:'9%'}}>Subject</span>
                  <span class="col-md-1 control-label" style={{width:"5%"}}>:</span>
                  <div class="col-md-10 mail-fields">
                    <input class="form-control" type="email"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChangesubject}
                        placeholder="Enter recipient email"
                        required
                        style={{
                          flex: "1",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}/>
                  </div>
                </label>
            </div>
             </div>
              <div style={{ marginBottom: "10px",height:"13rem" }}>
                <label style={{ display: "block", fontWeight: "bold",textAlign:"left" }}>
                  Message:
                </label>
                <ReactQuill
                  value={formData.body}
                  onChange={handleBodyChange}
                  style={{ height: "150px" }}
                />
              </div>
              <div class="form-group mb-2">
                <label class="row">
                  <span class="col-md-1 control-label" style={{width:'9%'}}>Attachments</span>
                  <span class="col-md-1 control-label" style={{width:'5%'}}>:</span>
                  <div class="col-md-10 mail-fields text-end">
                  <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ marginTop: "5px",width:'110px' }}
                />
                {attachments.length > 0 && (
                  <ul style={{ marginTop: "10px" }}>
                    {attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
                  </div>
                </label>
            </div>
              {/* <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold",textAlign:"left" }}>
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
              </div> */}
              <button
                type="button"
                onClick={onShowDiv}
                style={{
                  backgroundColor: "#464646",
                  color: "#fff",
                  padding: "5px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight:"1rem"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "5px 20px",
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
  zIndex:9999,
};

const dialogContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  width: "50%",
};

export default NewMail;
