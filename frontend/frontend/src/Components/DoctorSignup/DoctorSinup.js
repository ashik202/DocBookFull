import React from 'react'
import { DoctorSignUpSchema } from '../../schemas'
import {useFormik} from "formik"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosPrivate';
const initialValues={
    firstname:"",
    lastname:"",
    email:"",
    phoneno:"",
    password:"",
    passwordConfirmation:"",


}


const DoctorSinup = () => {
    const navigate = useNavigate();
    const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:initialValues,
        validationSchema:DoctorSignUpSchema,
        onSubmit:async(values,actions)=>{
        try{
                const response = await axiosInstance.post(`doctor/register/`, {
                    first_name: values.firstname,
                    last_name: values.lastname,
                    email: values.email,
                    password: values.password,
                    phone_number:values.phoneno
                  })
                  if (response.status ===200){
                    navigate('/')
                  }else {
                    alert('not valid credentials');
                  }
                } catch (error) {
                  // eslint-disable-next-line no-alert
                  alert(error);
                  console.log(error);
                }
                actions.resetForm();
                

            
        }
    })
  return (
    <>
     <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back ">
            <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">Doctor SignUp</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-black-700 dark:text-black-200" >FirstName</label>
                        <input  id="firstname" name='firstname' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md  dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                         value={values.firstname} onChange={handleChange} onBlur={handleBlur} />{<p className='Form_error'>{errors.firstname}</p>}
                    </div>

                    <div>
                        <label className="text-black-700 dark:text-black-200" >LastName</label>
                        <input id="lastname" name='lastname' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md  dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        value={values.lastname} onChange={handleChange} onBlur={handleBlur} />{<p className='Form_error'>{errors.lastname}</p>}
                    </div>
                    <div>
                        <label className="text-black-700 dark:text-black-200" >Email</label>
                        <input id="email" name='email' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        value={values.email} onChange={handleChange} onBlur={handleBlur} />{<p className='Form_error'>{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-black-700 dark:text-black-200" >PhoneNo</label>
                        <input id="phoneno" name='phoneno' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        value={values.phoneno} onChange={handleChange} onBlur={handleBlur} />{<p className='Form_error'>{errors.phoneno}</p>}
                    </div>

                    <div>
                        <label className="text-black-700 dark:text-black-200" >Password</label>
                        <input id="password" name='password' type="password" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" 
                        value={values.password} onChange={handleChange} onBlur={handleBlur}/>{<p className='Form_error'>{errors.password}</p>}
                    </div>

                    <div>
                        <label className="text-black-700 dark:text-black-200" >Password Confirmation</label>
                        <input id="passwordConfirmation"  name='passwordConfirmation' type="password" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        value={values.passwordConfirmation} onChange={handleChange} onBlur={handleBlur} />{<p className='Form_error'>{errors.passwordConfirmation}</p>}
                    </div>
                </div>

                <div className="flex justify-center mt-6 ">
                    <button type='submit' className="bg-indigo-700 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-black-700 rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600">Save</button>
                </div>
                Have Account?Login
            </form>
        </section>

    </>
  )
}

export default DoctorSinup