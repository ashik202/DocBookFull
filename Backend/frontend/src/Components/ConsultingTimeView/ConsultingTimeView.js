import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosPrivate';

const ConsultingTimeView = () => {
  const [search, setSearch] = useState();
  const [Data, SetData] = useState();
  const getdata = async () => {
    const respons = await axiosInstance.get(`user/viewbooking`);
    console.log(respons.data);
    SetData(respons.data);
  };
  const getsearcchdata = async () => {
    const respons = await axiosInstance.get(
      `user/viewbooking?search=${search}`
    );
    console.log(respons.data);
    SetData(respons.data);
  };

  const searchplace = (value) => {
    setSearch(value);
    getsearcchdata();
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 ">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className=" font-extrabold text-xl">Book Your Doctor</div>
              <div className="col-end-7 col-span-2 ...">
                {' '}
                <form>
                  <input
                    type="text"
                    className=" w-15 h-4 md:w-22 md:h-10 border-t-2 border-l-2 border-b-2 border-r-0 rounded-tl-xl rounded-bl-xl border-black text-center  "
                    placeholder="Specilization"
                    onChange={(e) => searchplace(e.target.value)}
                  />
                  <button
                    type="submit"
                    className=" w-24 h-10 border-t-2 border-r-2 border-b-2 border-l-0 
                     rounded-tr-xl rounded-br-xl border-black text-center background bg-sky-500 "
                  >
                    Seacher
                  </button>
                </form>
              </div>
            </div>

            {Data?.map((datas, key) => (
              <div className="h-62 md:h-32 w-full border-4 rounded-[15px] my-10 md:my-5 ">
                <div className="grid grid-cols-2 md:grid-cols-6   ">
                  <div className="m-3">
                    <img
                      className="h-20 w-20 rounded-[50%]"
                      src={`${datas.profile_picture
                      }`}
                    />
                  </div>
                  <div className="m-3">
                    Dr
                    <br />
                    <p>{datas.doctorfirst_name}</p>
                  </div>
                  <div className="m-3">
                    specilcation
                    <p>{datas.specialization}</p>
                  </div>
                  <div className="m-3">
                    Clinic Name
                    <br />
                    <p>{datas.clinic_name}</p>
                  </div>

                  <div className="m-3">
                    Address
                    <p>{datas.Addressline1} {datas.Addressline2}</p>
                  </div>
                 
                  <Link to={`/SingleDoctorBookPage/${datas.doctor_id}`}>
                  <button
                    type="button"
                    class=" h-10 md:m-10 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    View More
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingTimeView;
