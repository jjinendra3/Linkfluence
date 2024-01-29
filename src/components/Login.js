import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
const utype = {
  Influencer: "Influencer",
  Company: "Company",
  Event: "Event Organizer",
};
const Login = ({ accType , setauthType}) => {
  const [info, setinfo] = useState({ type: accType });
  const onChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } =  await axios.post("http://localhost:5000/auth/login", info);
    if (data.success) {
      localStorage.setItem("token",data.token);
      
    }
    else{
      toast.error(data.error);
    }
  };
  return (
    !accType ? (
      <span className="text-white">sample text</span>
    ) :<>
      <form className="form">
        <p className="title">Login </p>
        <p className="message">Login as a {utype[accType]}</p>
        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            required
            name="email"
            onChange={onChange}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required
            name="password"
            onChange={onChange}
          />
          <span>Password</span>
        </label>
        <button className="submit" onClick={handleSubmit}>
          SignUp
        </button>
        <p className="signin">
          Already have an acount ? <a onClick={()=>{setauthType('register')}} href="#">register</a>{" "}
        </p>
      </form>
    </>
  );
};

export default Login;
