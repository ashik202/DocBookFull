import React from 'react'
import { UserprofileUpdate} from '../../schemas'
import {useFormik} from "formik"
import { useNavigate } from 'react-router-dom';
import useAxios from '../../Axios/useAxios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {userdata} from '../../redux/reducer/UserSlice';




const UserProfileUpdate = () => {
    const Navigate=useNavigate()
    const dispatch= useDispatch()
    const users = useSelector((state) => state.user.user);
    const id= users.id
    const initialValues={
        firstname:users.firstname,
        lastname:users.lastname,
        email:users.email,
        phoneno:users.phonenumber,
    }
    const api=useAxios()
    const {values,errors,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:initialValues,
        validationSchema:UserprofileUpdate,
        onSubmit:async (values,action) =>{
            try{
                const response= await api.put(`user/updateprofile/`,{
                    id:id,
                    first_name: values.firstname,
                     last_name: values.lastname,
                     email: values.email,
                     phone_number:values.phoneno

                })
                if(response.status===201){
                    dispatch(userdata(response.data));
                    Navigate('/user_dashbord')
                }
                else{
                    alert("not valid credentials")
                }

            }catch(error){
                console.log(error)
                

            }
        }


    })
    


  return (
    <div>
          <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back ">
            <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">User Profile Update</h2>

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
                         value={values.lastname} onChange={handleChange} onBlur={handleBlur}/>{<p className='Form_error'>{errors.lastname}</p>}
                    </div>
                    <div>
                        <label className="text-black-700 dark:text-black-200" >Email</label>
                        <input id="email" name='email' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                         value={values.email} onChange={handleChange} onBlur={handleBlur}/>{<p className='Form_error'>{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-black-700 dark:text-black-200" >PhoneNo</label>
                        <input id="phoneno" name='phoneno' type="text" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        value={values.phoneno} onChange={handleChange} onBlur={handleBlur}/>{<p className='Form_error'>{errors.phoneno}</p>}
                    </div>

                   
                </div>

                <div className="flex justify-center mt-6 ">
                    <button type='submit' className="bg-indigo-700 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-black-700 rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600">Save</button>
                </div>
                
            </form>
        </section>
    </div>
  )
}

export default UserProfileUpdate