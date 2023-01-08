import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import { useDispatch } from 'react-redux';
import {drinfo} from '../../redux/reducer/UserSlice';
import {  useNavigate } from 'react-router-dom';


const DoctorDashbord = () => {
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  const users = useSelector((state) => state.user.user);
  const id=users.id
  const api=useAxios()
  const professionalinfo  = async ()=>{
    try{
      const response= await api.post(`doctor/profile/`,{
        id:id
      })
      if (response.data.completed===false){
        

      }
     
      dispatch(drinfo(response.data,));
    }catch(error){
      

    }


  }
  useEffect(() => {
    professionalinfo()
  },[]);


  const dr= useSelector((state)=>state.user.profitinalinfo)
  
  
  return (
    <>
    <div className="flex flex-row bg-white">
        
        
        <div className='grid lg:grid-cols-2 container max-auto bg-white '>
        <div className="w-2.5/3 h-96  bg-slate-100 m-10">
          <p className="font-bold m-5">Personal Data</p>
          <div className="">
            <p className="mt-2 font-bold text-left ml-3">
              Firstname:<span className="ml-3">{users.firstname} </span>{' '}
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              LastName:<span className="ml-3">{users.lastname}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              Email: <span className="">{users.email}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              PhoneNumber:<span className="">{users.phonenumber}</span>
            </p>
          </div>
          <Link to="/doctor_basicinfoUpdate">
          <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded" > Update</button></Link>
        </div>
        <div className="w-2.5/3 h-96  bg-slate-100 m-10">
          <p className="font-bold m-5">Profosalan Data</p>
          <div className="">
            <p className="mt-2 font-bold text-left ml-3">
            regno:<span className="ml-3">{dr.regno} </span>{' '}
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            specialization:<span className="ml-3">{dr.specialization}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            clinic_name: <span className="">{dr.clinic_name}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            Addressline1:<span className="">{dr.Addressline1}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            Addressline2:<span className="">{dr.Addressline2}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            link_of_map:<span className="">{dr.link_of_map}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            district:<span className="">{dr.district}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
            state:<span className="">{dr.states}</span>
            </p>
          </div>
          <Link to="/doctor_professionalinfoUpdate">
          <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded" > Update</button></Link>
        </div>
        </div>
        </div>
      
      
    </>
  )
}

export default DoctorDashbord