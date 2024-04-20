import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
const Home = () => {
  const [accType, setAccType] = useState(null);
  const [authType, setauthType] = useState("login");
  const handleType=(e)=>{
    setAccType(e.target.value);
  }
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="container w-1/2 flex flex-col gap-10 justify-center">
          <div className="text-3xl font-extrabold text-center">
            How do You Want to Use LinkFluence ?
          </div>
          <div className="radio-inputs flex flex-col">
            <label className="w-full m-0 p-0 flex justify-center">
              <input className="radio-input" type="radio" name="utype" value="Influencer" onChange={handleType}/>
              <span className="radio-tile">
                <span className="radio-label">As a Influencer</span>
              </span>
            </label>
            <label className="w-full m-0 p-0 flex justify-center">
              <input className="radio-input" type="radio" name="utype" value="Company" onChange={handleType}/>
              <span className="radio-tile">
                <span className="radio-label">As a Company</span>
              </span>
            </label>
            <label className="w-full m-0 p-0 flex justify-center">
              <input className="radio-input" type="radio" name="utype" value="Event" onChange={handleType}/>
              <span className="radio-tile">
                <span className="radio-label">As a Event Organizer</span>
              </span>
            </label>
          </div>
        </div>
        <div className="container w-1/2 bg-slate-900 flex justify-center items-center h-full">
            {authType==="login"?
            <Login accType={accType} setauthType={setauthType}/>:
            <Register accType={accType}  setauthType={setauthType} />
            }
        </div>
      </div>
    </>
  );
};

export default Home;
