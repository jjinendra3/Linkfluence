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
const Register = ({ accType, setauthType }) => {
  const navigate = useNavigate();
  const [info, setinfo] = useState({ type: accType });
  const [platforms, setPlatforms] = useState([]);
  const onChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    // if (
    //   !isURL(info.platform) ||
    //   !isURL(info.platform, {
    //     host_whitelist: ["facebook.com", "twitter.com", "instagram.com"],
    //   })
    // ) {
    //   setinfo({ ...info, platform: "" });
    //   return;
    // }
    setPlatforms([...platforms, info.platform]);
    setinfo({ ...info, platform: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (info.password !== info.repassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { tempData } = await axios.post(
      "http://localhost:5000/image/uploadimage",
      { images: info.photo }
    );
    if (tempData.success) {
      info.photo = tempData.image[0];
    } else {
      toast.error(tempData.message);
      return;
    }
    const form = new FormData();

    if(accType==="influencer"){
      form.append("platform", platforms);
    }
    else{
      form.append("poc", info.poc);
      if(accType==="event"){
        form.append("prev_event_link", info.eventlink);
      }
    }
    form.append("type", info.type);
    form.append("name", info.name);
    form.append("email", info.email);
    form.append("phone", info.mobile);
    form.append("password", info.password);
    form.append("photo", info.photo);
    form.append("genre", info.genre);
    form.append("pricerange", info.price);

    const { data } = await axios.post(
      "http://localhost:5000/auth/signup",
      form
    );
    if (data.success) {
      toast.success(data.msg);
      setauthType("login");
    } else {
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
            type="number"
            placeholder=""
            required
            name="mobile"
            onChange={onChange}
          />
          <span>Mobile no</span>
        </label>
        <div className="flex gap-x-2">
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
        </div>
        <label>
          <input
            className="input"
            type="file"
            placeholder=""
            required
            name="photo"
            onChange={onChange}
            value={info.photo}
          />
          <span>Profile Photo</span>
        </label>
        <div className="flex gap-x-2">
          <label className="flex-1">
            <select name="genre" onChange={onChange}>
              <option value="comedy">Comedy</option>
              <option value="food">food</option>
              <option value="tech">tech</option>
              <option value="cars">cars</option>
            </select>
          </label>
          <label className="flex-1">
            <select name="price" onChange={onChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>
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
        ) : accType === "Company" ? (
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
        ) : (
          <div className="flex gap-x-2">
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
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="eventlink"
              onChange={onChange}
            />
            <span>Event Link</span>
          </label>
          </div>
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
