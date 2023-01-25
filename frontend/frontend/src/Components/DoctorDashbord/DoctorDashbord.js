import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import { useDispatch } from 'react-redux';
import {drinfo} from '../../redux/reducer/UserSlice';
import {  useNavigate } from 'react-router-dom';


const DoctorDashbord = () => {
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  const users = useSelector((state) => state.user.user);
  const id=users.id
  const api=useAxios()
  const professionalinfo  = async ()=>{
    try{
      const response= await api.post(`doctor/profile/`,{
        id:id
      })
      if (response.data.completed===false){
        

      }
     
      dispatch(drinfo(response.data,));
    }catch(error){
      

    }


  }
  useEffect(() => {
    professionalinfo()
  },[]);


  const dr= useSelector((state)=>state.user.profitinalinfo)
  const profile_picture= useSelector((state) => state.user.profile);
  
  
  return (
    <>
     <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back mb-5 ">
            <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">Doctor Profile</h2>
            <div className='grid justify-items-center'>
            <img class="grid justify-items-center h-20 w-20 rounded-[50%] mt-2" src={profile_picture? `http://localhost:8000${profile_picture.image}`: profile_picture }alt="Large avatar"></img>
            <h4 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200 m-5">Welcome dr  {users.username} </h4>
            </div>

            <form >
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <p className="text-center " >FirstName</p>
                        <input disabled value={users.firstname}  id="firstname" name='firstname' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center  "/>
                    </div>

                    <div>
                        <p className="text-center" >LastName</p>
                        <input disabled value={users.lastname}  className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                    </div>
                    <div>
                        <p className="text-center" >Email</p>
                        <input disabled value={users.email} id="email" name='email' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                    </div>

                    <div>
                    <p className="text-center" >Phone Number</p>
                        <input disabled value={users.phonenumber} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    
                   

                   
                </div>
                <Link to="/doctor_basicinfoUpdate">
            <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
               
                
            </form>
        </section>
        <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back ">
            <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">Doctor professionalinfo</h2>
            <div className='grid justify-items-center'>
             </div>

            <form >
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <p className="text-center " >regno</p>
                        <input disabled value={dr.regno}  id="firstname" name='firstname' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center  "/>
                    </div>

                    <div>
                        <p className="text-center" >specialization</p>
                        <input disabled value={dr.specialization}  className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                    </div>
                    <div>
                        <p className="text-center" >clinic_name</p>
                        <input disabled value={dr.clinic_name} id="email" name='email' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                    </div>

                    <div>
                    <p className="text-center" >Addressline1</p>
                        <input disabled value={dr.Addressline1} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    <div>
                    <p className="text-center" >Addressline2</p>
                        <input disabled value={dr.Addressline2} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    <div>
                    <p className="text-center" >link_of_map</p>
                        <input disabled value={dr.link_of_map} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    <div>
                    <p className="text-center" >district</p>
                        <input disabled value={dr.district} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    <div>
                    <p className="text-center" >state</p>
                        <input disabled value={dr.states9} id="phonenumber" name='phonenumber' type="text" className="block w-full px-4 py-2 mt-2 text-black-700  border border-0 rounded-md reg-back text-center" />
                   
                    </div>
                    
                   

                   
                </div>
                <Link to="/doctor_professionalinfoUpdate">
            <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
               
                
            </form>
        </section>
    
      
      
    </>
  )
}

export default DoctorDashbord