import React, { useState } from "react";

const utype = {
  Influencer: "Influencer",
  Company: "Company",
  Event: "Event Organizer",
};

const Register = ({ accType }) => {
    const [data, setData] = useState({});
  const [platforms, setPlatforms] = useState([])
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}
    const handleAdd=(e)=>{
        e.preventDefault();
        setPlatforms([...platforms,data.platform])
        setData({...data,platform:""});
    }
    return (
    !accType?<span className="text-white">sample text</span>:<>
      <form className="form">
        <p className="title">Register </p>
        <p className="message">Signup as a {utype[accType]}</p>

        <label>
          <input className="input" type="text" placeholder="" required name="name" onChange={onChange}/>
          <span>Name</span>
        </label>
        <label>
          <input className="input" type="email" placeholder="" required name="email" onChange={onChange}/>
          <span>Email</span>
        </label>

        <label>
          <input className="input" type="password" placeholder="" required name="password" onChange={onChange}/>
          <span>Password</span>
        </label>
        <label>
          <input className="input" type="password" placeholder="" required name="repassword" onChange={onChange}/>
          <span>Confirm password</span>
        </label>
        <label>
          <select name="genre" onChange={onChange}>
            <option value="comedy">Comedy</option>
            <option value="food">food</option>
            <option value="tech">tech</option>
            <option value="cars">cars</option>
          </select>
        </label>
        {accType==="Influencer"?
        <div>
        <label>
            <div className="flex">
          <input className="input" type="text" placeholder="" required name="platform" value={data.platform} onChange={onChange}/>
          <span>platform</span>
          <button onClick={handleAdd}>+</button>
            </div>
        </label>
        {platforms.map((platform)=>{return <div>{platform}</div>})}
        </div>:
        <label>
        <input className="input" type="text" placeholder="" required name="poc" onChange={onChange}/>
        <span>POC</span>
      </label>
        }
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <a href="#">Signin</a>{" "}
        </p>
      </form>
    </>
  );
};

export default Register;
