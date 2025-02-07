import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/images/3856358.jpg";
import bottom from "../assets/images/2915898.jpg";
import axios from "axios";
import config from "../config";
const SignupForm = () => {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log("Signup with:", { name, email, password });
    const data = {
      "username":email,
      // "password":password,
      "name":name,
      "language":"eng",
      "mailboxformat":"maildir",
      "mailboxfolder":"Maildir",
      "storagebasedirectory":"/var/vmail",
      "storagenode":"vmail1",
      "maildir":"",
      "quota":1024,
      "domainName":"imailler.com",
      "transport":"",
      "department":"",
      "rank":"",
      "employeeid":"",
      "isadmin":0,
      "isglobaladmin": 0,
      "newpw":password,
      "confirmpw":password,
      "store_password_in_plain_text":"store_password_in_plain_text"
  }
  console.log(data)
  let configdata = {
    method: 'post',
    maxBodyLength: Infinity,
    url: config.api.url+'/api/add_user',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(configdata)
  .then((response) => {
    console.log(JSON.stringify(response.data));
      navigator('/login');
  })
  .catch((error) => {
    console.log(error);
  });
  };
  const loginPage = ()=>{
    navigator('/login');
  }

  return (
       <div className="row m-auto" >
      <div className="w-75 col-2">
        <img src={signup} style={{width:"100%"}}/>
      </div>
      <div className="w-25 col-2 p-4 border vh-100 log-signup">
    <form onSubmit={handleSignup} className="signup-form">
      <h2 className="text-center mb-4">Signup</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        
         <div class="input-group">
         <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width:"195px"}}
        />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend2">@</span>
          </div>
          <input type="text" class="form-control" value="imailler.com" disabled id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required style={{width:"100px",paddingLeft:"3px"}} />
        </div>

      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div style={{display:'flex',flexDirection:"row",justifyContent:"flex-end"}}>
        
        <div onClick={loginPage}>Login</div>
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">
        Signup
      </button>
    </form>
    <div className="footer-image">
        <img src={bottom} style={{width:"100%"}}/>
    </div>
    </div>
    </div>
  );
};

export default SignupForm;
