
import React,{useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import {drinfo} from '../../redux/reducer/UserSlice';
import {  useNavigate } from 'react-router-dom';

const DoctorViewBooking = () => {
  const [Date,SetDate]=useState([])
  const [Data,SetData]=useState([])
    const users = useSelector((state) => state.user.user);
    const dr= useSelector((state)=>state.user.profitinalinfo)
    const id=users.id
    console.log(id,"helllo")
    const api=useAxios()
    const getDate  = async ()=>{
        try{
          const response= await api.get(`doctor/doctorviewBooking/${id}`,
            )
         console.log(response.data,'data')
         SetDate(response.data)

        }catch(error){
            console.log(error)
          
    
        }
    
    
      }
      useEffect(() => {
        getDate()
      },[]);


      const getbooking =async (s)=>{
         try{
          const response= await api.post(`doctor/bookingdetailsview/`,{
            id:dr.id,
            date:s
          },
            )
         console.log(response.data,'data')
         SetData(response.data)
         
         

        }catch(error){
            console.log(error)
          
    
        }
        
      }
  return (
    <>
    <div className="grid grid-cols-6 gap-4">
    <div className="col-start-2 col-span-4 ...">
    <div class="grid grid-cols-6 gap-4 mt-4">
  
  <div class="col-start-1 col-end-3 text-xl font-normal ">View Your Booking</div>
  <div class="col-end-7 col-span-2 ...">
    <div className='flex'>
    <p className='text-xl mt-1'>Select Date </p>
    
    <select onClick={(e)=>{getbooking(e.target.value)}} className='w-32 h-8 bg-indigo-500 p-1 ml-2 rounded-lg hover:bg-white ' name="date" id="date">
   <option value="" disabled="disabled">Choose Tagging</option>
    {Date?.map((dates, key) => (
      <option value={dates.date} >{dates.date}</option>
    ))}
  
 
</select>
  
  
  
    </div>
  
  </div>
  </div>
  <hr class="h-px col-start-1 col-end-7 bg-gray-200 border-1 dark:bg-gray-700"/>

  {Data?.map((datas, key) => (





<div className="h-62 md:h-32 w-full border-4 rounded-[15px] my-10 md:my-5 ">
<div className="grid grid-cols-2 md:grid-cols-6   ">
  
  <div className="mt-3 ml-2">
    Token
    <br />
    <p>{datas.token}</p>
  </div>
  <div className="mt-3 ml-2">
  UserName

    <p>{datas.user_name

}</p>
  </div>
  <div className="mt-3 ml-2">
  PatientName

    <p>{datas.patientname
}</p>
  </div>
  <div className="mt-3 ml-2">
  Patientname Age
    <br />
    <p>{datas.age}</p>
  </div>

  <div className="mt-3 ">
  patientname Email
    <p>{datas.email}</p>
  </div>
  
  
</div>
</div>




                




  ))}
  
  
</div>

     
      

    </div>
    
    

    </>
  )
}

export default DoctorViewBooking