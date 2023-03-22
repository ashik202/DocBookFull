import React, { useEffect, useState } from 'react';
import useAxios from '../../Axios/useAxios';
import { useSelector } from 'react-redux';
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
const PackgeSelect = () => {
  const Navigate=useNavigate()
  const userid = useSelector((state) => state.user.docuser.id);
  console.log(userid);

  var plan_Id=0
  const getplanid=(s)=>{
    plan_Id=s
    console.log(plan_Id);  
  }
  const [Data, SetData] = useState();
  const api = useAxios();
  
  const getdata = async () => {
    try {
      const respons = await api.get('doctopackegview/');
      console.log(respons.data);
      SetData(respons.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

//Function to load razorpay script for the display of razorpay payment SDK.
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}
//function will get called when clicked on the pay button.


async function displayRazorpayPaymentSdk() {
  console.log(plan_Id);

  const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
  }

  // creating a new order and sending order ID to backend
  console.log(plan_Id);
  const result = await axios.post("http://127.0.0.1:8000/api/RazorpayPaymentView", {
      "order_id" : "Order-5152",
      "user_id":userid,
      "planId":plan_Id
  });


  if (!result) {
      alert("Server error. please check are you onlin?");
      return;
  }
  const handlePaymentSuccess = async (response) => {
    const datas =response
    console.log(response,"123333")

    try {
      
      const response = await api.post(`RazorpayCallback`, {
        plan_Id,
        userid,
        datas,
      
        
        
      });
      if(response.status === 200){
       
        console.log(response,"responsde")
        Navigate("/doctor_dashbord")
      }
      
     
      
    
    }
     catch (err) {
      console.log(err);
    }
  };

  // Getting the order details back
   const {merchantId=null , amount=null,currency=null,orderId=null,planId=null,user_id=null } = result.data;
   console.log(planId)

  const options = {

     planId:plan_Id,
     user_id:userid,
      key: merchantId,
      amount: amount.toString(),
      currency: currency,
      name: "Razorpay Testing",
      description: "Test Transaction",
      order_id: orderId,
      "handler": function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      }, 
     
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
 
}
const hello=()=>{
  console.log(plan_Id);
}
hello()
 
  return (
    <>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-2 col-span-4 ...">
          <p className="text-center mt-20 text-xl">Select Your Packege</p>
          <div className=""></div>
        </div>
      </div>
      <div className='container mx-auto'>
      <div className='flex justify-center'>
      {Data?.map((datas) => (
        <div class="m-5">
          <div class="w-30">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold mb-4">{datas.packegename}</h2>
              <p class="text-gray-600">
                Duration{datas.packeduration}
              </p>
              <p class="text-3xl font-bold text-green-500 mt-4">${datas.amound}</p>
              <button class="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"  onClick={() => {
                getplanid(datas.id)
              }} >
                Select 
              </button>
              
            </div>
          </div>
        </div>
      ))}
      </div>
      <button class="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600" onClick={displayRazorpayPaymentSdk}>
                pay Now
              </button>
      </div>
    </>
  );
};

export default PackgeSelect;
