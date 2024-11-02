import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/images/3856358.jpg";
import bottom from "../assets/images/2915898.jpg";
const SignupForm = () => {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log("Signup with:", { name, email, password });
  };
  const loginPage = ()=>{
    navigator('/login');
  }

  return (
       <div className="row m-auto" >
      <div className="w-75 col-2">
        <img src={signup} style={{width:"100%"}}/>
      </div>
      <div className="w-25 col-2 p-5 border vh-100 log-signup">
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
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
