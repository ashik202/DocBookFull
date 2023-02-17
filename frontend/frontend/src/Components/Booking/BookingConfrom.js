import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../Axios/useAxios';
import { Link } from 'react-router-dom';


const BookingConfrom = () => {
  const api=useAxios()
  const [Data,SetData]=useState()
  const id = useParams()
const consult_id = id['id'];
const getdata = async () => {
  const respons = await api.get(`bookingconformation/${consult_id}`);
  SetData(respons.data);
  console.log(respons.data)
  
};
useEffect(() => {
  getdata();
}, []);
  return (
    <>
    <p className='text-center font-bold text-4xl '>Slot Conformed </p>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-5' >
    <div className="w-full  flex flex-col items-center">
          <div className='flex'><img
            className="h-20 w-20 rounded-[50%]"
            src={Data ? `http://127.0.0.1:8000${Data.profile_picture}`:""}
          />
          <p className="mt-4 ml-5 font-semibold font-xl">
            Dr {Data && Data.doctorfirst_name} {Data && Data.doctorlast_name}
          </p></div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>Specialization:</div>
            <div>{Data && Data.specialization}</div>
            <div>Clinic_Name:</div>
            <div>{Data && Data.clinic_name}</div>
            <div>Address:</div>
            <div>{Data && Data.Addressline1}<br/>{Data && Data.Addressline2}<br/>{Data && Data.district}</div>
            <div>Date:</div>
            <div>{Data && Data.date}</div>
            <div>Time:</div>
            <div>{Data && Data.time_start} to {Data && Data.time_end}</div>

          </div>
          
        </div>
        <div className="w-full  flex flex-col items-center">
          <p className='text-xl'>patient Details</p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>patient Name:</div>
            <div>{Data && Data.patientname}</div>
            <div>patient age:</div>
            <div>{Data && Data.age}</div>
            <div>patient Email:</div>
            <div>{Data && Data.email}<br/></div>
            <div>patient token:</div>
            <div>{Data && Data.token}</div>
            
          </div>
          <p className='mt-5 text-2xl font-bold text-green-500'>Booking Confirmed </p>

        </div>
       
        
      
     

    </div>
    <div class="flex justify-center align-center h-screen">
    <Link to={'/'}>
    <button class="mt-4 bg-blue-500 w-20 h-10 text-white font-bold  rounded">
      
  Got Home
</button></Link>
    </div>
    
    </>
  )
}

export default BookingConfrom