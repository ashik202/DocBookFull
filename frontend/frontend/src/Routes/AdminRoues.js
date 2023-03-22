import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const AdminRoues = () => {
    const admin = useSelector((state) => state.user.admin);
    console.log(admin&&admin.adisLoggedIn,"admin route");
  return (
    admin&&admin.adisLoggedIn?<Outlet/>:<Navigate to="/user_login"/>
  )
}

export default AdminRoues