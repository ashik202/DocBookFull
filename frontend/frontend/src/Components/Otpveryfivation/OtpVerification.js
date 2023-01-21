import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosPrivate';
import {useFormik} from "formik"


const initialValues={
  otp:''
}
const OtpVerification = () => {
  const navigate =useNavigate()
  const id= useParams();
  const u_id=id['id']
  const {values,errors,handleBlur,handleChange,handleSubmit}= useFormik({
    initialValues:initialValues,
    onSubmit:async(values,actions)=>{
      try{
        const response = await axiosInstance.post(`otpverifivation/`, {
          id: u_id,
          otp:values.otp
         } )
         if (response.status===200){
          navigate("/")
         }

      }catch{

      }
    }

  })
  
  return (
    <div className="h-6 grid grid-cols-6 gap-4 h-full">
    <div className="col-start-2 col-end-6 col-span-4 h-full">
       <div className='flex items-center'>
       <div className='w-full h-1/3 border-4 border-0 m-10 '>
        <p className='text-2xl font-l font-semibold mb-2'>Verifi Your Account</p>
        <form onSubmit={handleSubmit}>
          <input type={'text'} name="otp" id="otp" value={values.lastname} onChange={handleChange} onBlur={handleBlur} className="border-1 border-indigo-500 rounded-lg focus:border-indigo-500 outline-0" /><br/>
          <button class="m-10 bg-slate-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
  Button
</button>
        </form>
        </div>
       </div>


    </div>
    </div>
  )
}

export default OtpVerification