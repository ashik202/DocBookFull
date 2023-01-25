import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios/axiosPrivate';

const ConsultingTimeView = () => {
  const [Data, SetData] = useState();
  const getdata = async () => {
    const respons = await axiosInstance.get(`user/viewbooking`);
    console.log(respons.data);
    SetData(respons.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div>
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-2 col-span-4 ">
            <div className="grid justify-items-start text-base text-3xl mb-10">
              Book Your Doctor
            </div>
            {Data?.map((datas,key)=>(
            <div className="h-32 w-full border-4 rounded-[15px]  m-5">
              <div className="flex items-center justify-center mt-2 ">
              <div className='m-3'>
                
            <img className='sm:h-10 w-10 rounded-[50%]' src={`http://localhost:8000${datas.profilpic}`}/>
                </div>
                <div className='m-3'>
                  Dr
                  <br />
                  <p>{datas.first_name}</p>
                </div>
                <div className='m-3'>specilcation
                  <p>{datas.specialization}</p>
                </div>
                <div className='m-3'>
                  Clinic Name<br/>
                  <p>{datas.clinic_name}</p>

                </div>
                <div className='m-3'>
                  Address
                  <p>
                    {datas.Addressline1}<br/>
                    {datas.Addressline2}<br/>
                    {datas.district}
                    
                  </p>
                </div>
                <div className='m-3'>
                  Date
                  <p>{datas.date}</p>
                </div >
                <div className='m-3'>
                  Time
                  <p>{datas.time_start}to{datas.time_end}</p>
                </div >
                <button
                  type="button"
                  class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                >
                  Add Pesiant
                </button>
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
