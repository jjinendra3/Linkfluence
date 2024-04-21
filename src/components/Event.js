import axios from "axios";
import React, {useState } from "react";
import { toast } from "react-toastify";

export default function Event(/*{ showModal, type, setShowModal }*/) {
  const [showModal, setShowModal] = useState(true);
  const [ev, setEv] = useState({
    name: "",
    theme: "",
    budget: "",
    description: "",
    venue: "",
    link: "",
    startDate: "",
    endDate: "",
    img: "",
  });

  const AddEvent = async (e) => {
    e.preventDefault();
    if(ev.name===""||ev.theme===""||ev.budget===""||ev.description===""||ev.venue===""||ev.link===""||ev.startDate===""||ev.img===""){
      toast.error("Please fill all the fields");
      return;
    }
    const form = new FormData();
    let d= ev.startDate;
    form.append("name", ev.name);
    form.append("datetime", {d:"0900-2100"});
    form.append("theme", ev.theme);
    form.append("venue", ev.venue);
    form.append("venuelink", ev.link);
    form.append("price", ev.budget);
    form.append("desc", ev.description);
    const {tempData}= await axios.post("http://localhost:5000/image/uploadimage",{images:ev.img});
    if(tempData.success){
      form.append("images", [tempData.image[0]]);
    }
    else{
      toast.error(tempData.message);
      return;
    }
    let config = {
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      }
    }
    const {data}= await axios.post("http://localhost:5000/events/addevent",form,config);
    if(data.success){
      toast.success(data.message);
      setShowModal(false);
    }
    else{
      toast.error(data.message);
    }
  }
  const onChange = (e) => {
    setEv({ ...ev, [e.target.name]: e.target.value });
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto bg-gray-400 rounded-xl flex justify-center px-4">
              {/*content*/}
              <form className="file-upload-form my-auto">
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input id="file" type="file" name="img" onChange={onChange} />
                </label>
              </form>
              <div className="mt-4 flex flex-col bg-bg2-col rounded-lg p-4 shadow-sm">
                <h2 className="text-primary-col font-bold text-lg">
                  Add Event
                </h2>

                <div className="mt-4">
                  <label className="text-white" htmlFor="name">
                    Name
                  </label>
                  <input
                    placeholder="event name"
                    className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={ev.name}
                  />
                </div>
                <div className="mt-4  flex flex-row space-x-2">
                  <div className="flex-1">
                  <label className="text-white" htmlFor="name">
                    Theme
                  </label>
                  <select name="theme" onChange={onChange} value={ev.theme} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1">
                    <option value="technology">technology</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Music">Music</option>
                    <option value="Food">Food</option>
                    <option value="Festival">Festival</option>
                  </select>
                  </div>
                  <div className="flex-1">
                  <label className="text-white" htmlFor="budget">
                    Budget
                  </label>
                  <select name="budget" onChange={onChange} value={ev.budget} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-white" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    placeholder="event description"
                    className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                    id="description"
                    onChange={onChange}
                    name="description"
                    value={ev.description}
                  ></textarea>
                </div>

                  <div className="flex-1">
                    <label className="text-white" htmlFor="venue">
                      venue
                    </label>
                    <input
                      placeholder="event venue"
                      className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                      id="venue"
                      type="text"
                      onChange={onChange}
                      name="venue"
                      value={ev.venue}
                    />
                  </div>
                <div className="mt-4">
                  <label className="text-white" htmlFor="link">
                    venue link
                  </label>
                  <input
                    placeholder="event name"
                    className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                    type="text"
                    name="link"
                    onChange={onChange}
                    value={ev.link}
                  />
                </div>
                <div className="mt-4 flex flex-row space-x-2">
                <div className="flex-1">
                    <label className="text-white" htmlFor="date">
                      Date
                    </label>
                    <input
                      className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1"
                      type="date"
                      onChange={onChange}
                      name="startDate"
                      value={ev.date}
                    />
                </div>
                </div>
                <div className="mt-4 flex justify-end gap-5 mt-5">
                  <button
                    className="bg-red-400 text-bg1-col rounded-md px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-200"
                    type="submit"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    cancel
                  </button>
                  <button
                    className="bg-green-400 text-bg1-col rounded-md px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-200"
                    type="submit"
                    onClick={() => {
                      AddEvent();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
