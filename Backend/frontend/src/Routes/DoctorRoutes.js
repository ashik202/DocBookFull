import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const DoctorRoutes = () => {
    const doctor = useSelector((state) => state.user.docuser);
    console.log(doctor&&doctor.docisLoggedIn,"docrot rout");
  return (
    doctor&&doctor.docisLoggedIn?<Outlet/>:<Navigate to="/user_login"></Navigate>
  )
}

export default DoctorRoutes