import React,{useState} from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Landing from '../Components/Landing/Landing'
import { useSelector } from 'react-redux';
import UserHeader from '../Components/UserDashBord/UserHeader';

const LandingPage = () => {
  const users = useSelector((state) => state.user.user);
  
 
  return (
    <>
    {users && users.isLoggedIn?<UserHeader/>:<Header/>}
    <Landing/>
    <Footer/>
    </>
  )
}

export default LandingPage