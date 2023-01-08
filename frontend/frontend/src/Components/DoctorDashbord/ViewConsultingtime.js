import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useAxios from '../../Axios/useAxios';

const ViewConsultingtime = () => {
  const [Data, SetData] = useState();
  const api = useAxios();
  const users = useSelector((state) => state.user.user);
  const id = users.id;
  const consultingtime = async () => {
    try {
      const response = await api.get(`doctor/counsaltingtime/${id}`);
      console.log(response.data);
      SetData(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    consultingtime();
  }, []);
  return (
    <>
      <div className="container ">
        <div className="grid ">
          <p className="justify-items-center mt-10 text-3xl font-bold">
            {' '}
            View Consuting Time
          </p>
          <div className="flex justify-end">
            <p className="">
            <Link to="/doctor_addconsultingtime">

              <button
                type="button"
                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Add Time
              </button></Link>
            </p>
          </div>
          <div className="grid text-center">
            <table class="table-auto">
              <thead>
                <tr>
                  <th className="mr-10">Date</th>
                  <th className="mr-5">Time Start</th>
                  <th className="mr-5">Time End</th>
                  <th className="mr-5">Number of Token</th>
                  <th className="mr-5">Number of Token</th>
                  <th className="mr-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {Data?.map((datas) => (
                  <tr>
                    
                    <td>{datas.date}</td>
                    <td>{datas.time_start}</td>
                    <td>{datas.time_end}</td>
                    <td>{datas.totaltoken}</td>
                    <td>{datas.totaltoken}</td>
                    <td>
                      <div class="inline-flex">
                        <Link to={`/doctor_EditeCounsultingtime/${datas.id}`}>
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                          Edit
                        </button>
                        </Link>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewConsultingtime;
