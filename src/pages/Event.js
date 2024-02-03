import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchEvent = async () => {
      let config = {
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      }
      const { data } = await axios.get(`http://localhost:5000/common/get/event/${id}`, config);
      if (data.success) {
        setEvent(data.response);
      }
      else{
        navigate("/404");
      }
    };
    fetchEvent();
  }, []);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto bg-gray-400 rounded-xl flex justify-center px-4">
          <div className="file-upload-form my-auto">
            <div className="flex flex-col gap-y-5">
              <div className="text-2xl font-bold">Event</div>
              <div className="flex flex-col gap-y-2">
                <img src={event.image} alt="Event Image"/>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Name:</div>
                <div className="text-xl">{event.name}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Theme:</div>
                <div className="text-xl">{event.theme}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Budget:</div>
                <div className="text-xl">{event.budget}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Description:</div>
                <div className="text-xl">{event.description}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Venue:</div>
                <div className="text-xl">{event.venue}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Link:</div>
                <div className="text-xl">{event.link}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Start Date:</div>
                <div className="text-xl">{event.startDate}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">End Date:</div>
                <div className="text-xl">{event.endDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Event
