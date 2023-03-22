import React, { useEffect } from 'react'
import SingleConsultingTimeView from '../Components/ConsultingTimeView/SingleConsultingTimeView'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

const SingleConsultingViewPage = () => {
  const users = useSelector((state) => state.user.user);
  const Navigate=useNavigate()
  
  useEffect(() => {
    if(users?.isLoggedIn ) {
      console.log('sdfdf');
    }else {
      console.log(4333);
      Navigate('/user_login')
    }
  },[users])
  
  return (
    <div>
      {users && users.isLoggedIn?<SingleConsultingTimeView/> : 'sd'}
        
    </div>
  )
}

export default SingleConsultingViewPage