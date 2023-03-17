import React, { useEffect, useState } from 'react';
import useAxios from '../../Axios/useAxios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BookinViewUser = () => {
  const users = useSelector((state) => state.user.user);
  const id = users.id;
  const api = useAxios();
  const [Data, SetData] = useState();
  const getdata = async () => {
    try {
      const response = await api.get(`user/viewbooking/${id}`);
      console.log(response.data);
      SetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  function createConversationName(first_name) {
    const namesAlph = [users.firstname, first_name].sort();
    console.log(namesAlph)
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }
  return (
    <>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-2 col-span-4 ...">
          <div class="grid grid-cols-6 gap-4">
            <div class="col-start-1 col-end-3 text-2xl font-bold ">
              Welcome {users.username}
            </div>
            <div class="col-end-7 col-span-2 text-2xl font-bold">
           
            </div>
          </div>
          {Data?.map((datas, key) => (
              <div className="h-62 md:h-32 w-full border-4 rounded-[15px] my-10 md:my-5 ">
                <div className="grid grid-cols-2 md:grid-cols-8  ">
                  <div className="m-3">
                    <img
                      className="h-20 w-20 rounded-[50%]"
                      src={`http://127.0.0.1:8000${datas.profile_picture}`}
                    />
                  </div>
                  <div className="m-3">
                    Dr
                    <br />
                    <p>{datas.doctorfirst_name} {datas.doctorlast_name}</p> 
                  </div>
                  <div className="m-3">
                  Patient
                    <p>{datas.patientname}</p>
                  </div>
                  <div className="m-3">
                    Token No
                    <br />
                    <p>{datas.token}</p>
                  </div>

                  <div className="m-3">
                    Date
                    <p>{datas.date}</p>
                  </div>
                  <div className="m-3">
                    Time
                    <p>
                      {datas.time_start} to {datas.time_end}
                    </p>
                  </div>
                  <Link to={`/Booking_conformation/${datas.id}`}>
                  <button
                    type="button"
                    class=" h-10 md:m-10 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    View More
                  </button>
                  </Link>

                  <Link to={`/chat/${createConversationName(datas&& datas.doctorfirst_name)}`}>
            <button
                type="submite"
                className="m-2 bg- h-10 md:m-10 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline-600 p-2 rounded-xl "
              >
                chat
              </button>
          </Link>
                </div>
              </div>
            ))}
         
        </div>
      </div>
    </>
  );
};

export default BookinViewUser;
