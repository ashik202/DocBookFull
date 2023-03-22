import React ,{useEffect}from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import UserLogin from '../Components/UserLogin/UserLogin'
import { useDispatch,useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

export const UserLoginPage = () => {
  const Navigate=useNavigate();
  let doctor = useSelector((state) => state.user.docuser);
  let users = useSelector((state) => state.user.user);
  let admin = useSelector((state) => state.user.admin);
  const Home =()=>{ 
    console.log("inside the home");
        
    if(doctor&&doctor.docisLoggedIn===true){
      
      Navigate('/doctor_dashbord')
    }
    else if(users&&users.isLoggedIn===true)
    {
      Navigate('/user_dashbord')

    }
    else if(admin&&admin.adisLoggedIn===true)
    {
      Navigate('/Admin_userView')

    }
}
  
  useEffect(() => {
    Home()
  },[]);
 
  return (
    <>
    
    <Header/>
    <br/><br/>
    <UserLogin/>
    <br/><br/><br/><br/><br/><br/>
    <Footer/>

    </>
  )
}
export default  UserLoginPage