import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxios from '../../Axios/useAxios';
import { useSelector } from 'react-redux';
const AddCunsutingtime = () => {
  const id=useSelector((state) => state.user.docuser.id);
  const api=useAxios()
  const navigate= useNavigate()
  const initilValues = {
    Date:'',
    time_start: '',
    time_end: '',
    totaltoken: '',
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initilValues,
      

      onSubmit: async (values, action) => {
        try {
          const response = await api.post(`doctor/counsaltingtime`, {
            id:id,
            date: values.Date,
            time_start: values.time_start,
            time_end: values.time_end,
            totaltoken: values.totaltoken,
          });
          if (response.status === 201) {
            navigate("/doctor_viewconsution")

          } else {
          }
        } catch (error) {
          alert(error);
          console.log(error);
        }
        action.resetForm();
      },
    });



  return (
    <div>
      <div className="grid justify-items-center">
        
        
        <form onSubmit={handleSubmit}>
        <div className="col-start-2 col-span-4">
          <p className="font-bold  ">Add Your Cunsulting Time</p>
          
          <div className="grid grid-cols-2 m-5 justify-items-start">
            <div className='mt-3'>Date</div>
            <div>
            <input
                type="Date"
                name="Date"
                id="Date"
                className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
                value={values.Date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 m-5 justify-items-start">
            <div className='mt-3'>Time StartFrom</div>
            <div>
              <input
                type="text"
                name="time_start"
                id="price"
                className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
                value={values.time_start}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 m-5 justify-items-start">
            <div>Time Uo to</div>
            <div>
              <input
                type="text"
                name="time_end"
                id="time_end"
                className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
                value={values.time_end}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 m-5 justify-items-start">
            <div>Total Number of tokens</div>
            <div>
              <input
                type="text"
                name="totaltoken"
                id="totaltoken"
                className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
                value={values.totaltoken}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            </div>
          </div>'
          <button
                type='submit'
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
          
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddCunsutingtime;
