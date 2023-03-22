import React,{useEffect} from 'react'
import DoctotHeader from '../Components/DoctorDashbord/DoctotHeader'
import ViewConsultingtime from '../Components/DoctorDashbord/ViewConsultingtime'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

export const ViewConsultationtimePage = () => {
  const users = useSelector((state) => state.user.profitinalinfo);
  const Navigate=useNavigate()

  useEffect(() => {
    console.log("");
    if(users?.payment ) {
      console.log('sdfdf');
    }else {
      console.log(4333);
      Navigate('/doctor_viewpackage')
    }
  },[users])
  return (
    <div>
      <DoctotHeader/>
      <br/>
      <ViewConsultingtime/>
      </div>
  )
}
