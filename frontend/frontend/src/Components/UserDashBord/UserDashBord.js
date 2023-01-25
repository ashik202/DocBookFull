import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';



const UserDashBord = () => {
  
  const users = useSelector((state) => state.user.user);
  const profile_picture= useSelector((state) => state.user.profile);
  console.log(profile_picture);
  console.log('hello', users);

  return (
    <>
     
        <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back ">
            <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">User Profile</h2>
            <div className='grid justify-items-center'>
            <img class="grid justify-items-center h-20 w-20 rounded-[50%] mt-2" src={profile_picture? `http://localhost:8000${profile_picture.image}`: profile_picture }alt="Large avatar"></img>
            <h4 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200 m-5">Welcome {users.username} </h4>
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
                    
                   
+++9
                   
                </div>
                <Link to="/user_profile_update">
            <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
               
                
            </form>
        </section>
    
    </>
  );
};

export default UserDashBord;
