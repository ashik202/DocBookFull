import React from 'react'
import ConsultingTimeView from '../Components/ConsultingTimeView/ConsultingTimeView'
import Header from '../Components/Header/Header'
import { useSelector } from 'react-redux';
import UserHeader from '../Components/UserDashBord/UserHeader'

const ConsultingTimeViewPage = () => {
  const users = useSelector((state) => state.user.user);
  return (
    <div>
      {users && users.isLoggedIn?<UserHeader/>:<Header/>}

      <ConsultingTimeView/>

    </div>
  )
}

export default ConsultingTimeViewPage