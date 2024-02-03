import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CompanyProduct = () => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchCompany = async () => {
      let config = {
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      }
      const { data } = await axios.get(`http://localhost:5000/common/get/companyproduct/${id}`, config);
      if (data.success) {
        setProduct(data.response);
      }
      else{
        navigate("/404");
      }
    };
    fetchCompany();
  }, []);
  return <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto bg-gray-400 rounded-xl flex justify-center px-4">
        <div className="file-upload-form my-auto">
          <div className="flex flex-col gap-y-5">
            <div className="text-2xl font-bold">Product</div>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-5">
                <img src={product.image} alt="Product Image"/>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Name:</div>
                <div className="text-xl">{product.name}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Category:</div>
                <div className="text-xl">{product.category}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Price:</div>
                <div className="text-xl">{product.price}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Description:</div>
                <div className="text-xl">{product.desc}</div>
              </div>
              <div className="flex gap-x-5">
                <div className="text-xl font-bold">Company:</div>
                <div className="text-xl">{product.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default CompanyProduct;
