import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Influencer = () => {
  const [influencer, setInfluencer] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchInfluencer = async () => {
      let config = {
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      }
      const { data } = await axios.get(`http://localhost:5000/common/get/influencer/${id}`, config);
      if (data.success) {
        setInfluencer(data.response);
      }
      else{
        navigate("/404");
      }
    };
    fetchInfluencer();
  },[]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto bg-gray-400 rounded-xl flex justify-center px-4">
          <div className="file-upload-form my-auto">
            <div className="flex flex-col gap-y-5">
              <div className="text-2xl font-bold">Influencer</div>
              <div className="flex flex-col gap-y-2">
                <img src={influencer.photo} alt="photo"/>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Name:</div>
                <div className="text-xl">{influencer.name}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Influencer
