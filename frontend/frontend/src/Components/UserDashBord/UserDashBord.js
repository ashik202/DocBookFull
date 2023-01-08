import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';

import { HiMenuAlt3 } from 'react-icons/hi';

const UserDashBord = () => {
  const [open, setopen] = useState(true);
  const users = useSelector((state) => state.user.user);
  console.log('hello', users);

  return (
    <>
      <div className="flex flex-row">
      <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? 'w-60' : 'w-16'
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-ponter"
              onClick={() => setopen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <div>
              <div className="flex">
                {React.createElement(HiMenuAlt3, { size: '20' })}

                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  Dash bord
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-1/2 bg-slate-100 m-20">
          <p className="font-bold m-5">User Profile</p>
          <div className="">
            <p className="mt-2 font-bold text-left ml-3">
              Firstname:<span className="ml-3"> {users.firstname}</span>{' '}
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              LastName:<span className="ml-3">{users.lastname}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              Email: <span className="">{users.email}</span>
            </p>
            <p className="mt-2 font-bold text-left ml-3">
              PhoneNumber:<span className="">{users.phonenumber}</span>
            </p>
          </div>
          <Link to="/user_profile_update">
          <button class="bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded" >
  Update
</button></Link>
        </div>
      </div>
      
    </>
  );
};

export default UserDashBord;
