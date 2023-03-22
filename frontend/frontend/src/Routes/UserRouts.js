import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const UserRouts = () => {
    let users = useSelector((state) => state.user.user);
    console.log(users&&users.isLoggedIn);
  return (
  users&&users.isLoggedIn?<Outlet/>:<Navigate to="/user_login"></Navigate>
  )
}

export default UserRouts