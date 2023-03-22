import React,{useEffect} from 'react';
import './userlogin.css'

import {useFormik} from "formik";
import {LoginSchemas} from '../../schemas'
import axiosInstance from '../../Axios/axiosPrivate';
import {  useNavigate } from 'react-router-dom';


import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {userdata,login,pic,docdata,docpic,admindata} from '../../redux/reducer/UserSlice';
const initialValues={
    email:"",
    password:"",
}

export const UserLogin = () => {
  
    const Navigate=useNavigate();
    const dispatch=useDispatch()
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}= useFormik({
        initialValues:initialValues,
        validationSchema:LoginSchemas,
        onSubmit:async (values,actions)=>{
            try{
                const response =await axiosInstance.post(`user/login/`,{
                    email:values.email,
                    password:values.password
                });
                if (response.status===200 && response.data.is_doctor===true)
                {
                    dispatch(docdata(response.data));
                    dispatch(login(response.data))
                    dispatch(docpic(response.data,));
                    Navigate('/doctor_dashbord')
                }
                if (response.status===200 && response.data.is_user===true)
                {
                    console.log(response.data)
                    dispatch(userdata(response.data));
                    dispatch(pic(response.data,));
                    dispatch(login(response.data))


                    Navigate('/user_dashbord')
                }
                if (response.status===200 && response.data.is_superadmin===true)
                {
                dispatch(admindata(response.data));
                dispatch(login(response.data))
                Navigate('/Admin_userView')
                }

               
            }catch{
                alert('somethine went worn')
            }
            actions.resetForm();
            
        }
    })
    


  return (
    <>
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md bg-gray-200">
    <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-black">Login</h1>

    <form className="mt-6" onSubmit={handleSubmit}>
    <div className="mt-4">
            <div className="flex items-center justify-between">
                <label  className="block text-sm text-gray-800 dark:text-black">Email</label>
                
            </div>

            <input name="email" id="email" type="email" className="block w-full px-4 p-2 mt-2 text-bg-white border rounded-lg dark: dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            value={values.email} onChange={handleChange} onBlur={handleBlur}/>
           {errors.email && touched.email ? (
                <p className='Form_error'>{errors.email}</p>
              ) : null}
        </div>

        <div className="mt-4">
            <div className="flex items-center justify-between">
                <label  className="block text-sm text-gray-800 dark:text-black">Password</label>
                <a href="/" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</a>
            </div>

            <input name="password" id="password" type="password" className="block w-full px-4 p-2 mt-2 text-bg-white border rounded-lg dark: dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            value={values.password} onChange={handleChange} onBlur={handleBlur}/>
           {errors.password && touched.password ? (
                <p className='Form_error'>{errors.password}</p>
              ) : null}
        </div>

        <div className="mt-6">
            <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-600 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
            </button>
        </div>
    </form>

    <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a href="/" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with Mobile
        </a>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
    </div>

    <div className="flex items-center mt-6 -mx-2">
        <button  className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">

            <span className="hidden mx-2 sm:inline">Sign in with Mobile</span>
        </button>
        

    </div>
    <br/>
    <Link to="/doctor_signup">
    <p>Are You A Doctor? Register Here</p></Link>
    <Link to="/user_signup">

    <p className="flex align-item-center mt-8 text-xs font-light text-center text-gray-400"> Don't have an account?Signup </p></Link>
</div>
    </>
  )
};
export default  UserLogin
