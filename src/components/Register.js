import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isURL from "validator/lib/isURL";
const utype = {
  Influencer: "Influencer",
  Company: "Company",
  Event: "Event Organizer",
};
const Genre = [ 
  { value: "Fashion", label: "Fashion"},    
  { value: "Fitness", label: "Fitness"},
  { value: "Travel", label: "Travel"},
  { value: "Beauty", label: "Beauty"},
  { value: "Gaming", label: "Gaming"},
  { value: "Food", label: "Food"},
  { value: "Lifestyle", label: "Lifestyle"},
  { value: "Technology", label: "Technology",},
  { value: "Comedy", label: "Comedy"},
  { value: "Music", label: "Music"},
  { value: "Health", label: "Health"},
  { value: "DIY", label: "DIY"},
  { value: "Sports", label: "Sports"}
];

const Register = ({ accType, setauthType }) => {
  const navigate = useNavigate();
  const [info, setinfo] = useState({ type: accType });
  const [platforms, setPlatforms] = useState([]);
  const onChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleAdd = (e) => {
    // pending - validate link and identify platform
    e.preventDefault();
    if (!isURL(info.platform) || !isURL(info.platform, { host_whitelist: ['facebook.com', 'twitter.com', 'instagram.com'] })){
      setinfo({ ...info, platform: "" });
      return;
    }
    setPlatforms([...platforms, info.platform]);
    setinfo({ ...info, platform: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } =  await axios.post("http://localhost:5000/auth/signup", info);
    if (data.success) {
      toast.success(data.msg);
      setauthType("login");
    }
    else{
      toast.error(data.error);
    }
  };
  return !accType ? (
    <span className="text-white">sample text</span>
  ) : (
    <>
      <form className="form">
        <p className="title">Register </p>
        <p className="message">Signup as a {utype[accType]}</p>

        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            name="name"
            onChange={onChange}
          />
          <span>Name</span>
        </label>
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
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required
            name="repassword"
            onChange={onChange}
          />
          <span>Confirm password</span>
        </label>
        <label>
          <select name="genre" onChange={onChange}>
            {Genre.map((genre)=>{
              return <option value={genre.value}>{genre.value}</option>
            })}
          </select>
        </label>
        {accType === "Influencer" ? (
          <div>
            <label>
              <div className="flex">
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required
                  name="platform"
                  value={info.platform}
                  onChange={onChange}
                  style={{
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                />
                <span>platform</span>
                <button
                  className="w-10 bg-cyan-400 rounded-r-lg flex justify-center items-center"
                  onClick={handleAdd}
                >
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </label>
            <div className=" h-10 overflow-y-auto my-2">
              {platforms.map((platform) => {
                return <div>{platform}</div>;
              })}
            </div>
          </div>
        ) : (
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="poc"
              onChange={onChange}
            />
            <span>POC</span>
          </label>
        )}
        <button className="submit" onClick={handleSubmit}>
          SignUp
        </button>
        <p className="signin">
          Already have an acount ?{" "}
          <a
            onClick={() => {
              setauthType("login");
            }}
            href="#"
          >
            Signin
          </a>{" "}
        </p>
      </form>
    </>
  );
};

export default Register;
