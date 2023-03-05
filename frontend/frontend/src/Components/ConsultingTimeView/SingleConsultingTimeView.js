import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosPrivate';
import useAxios from '../../Axios/useAxios';
import { useFormik } from 'formik';
import { patient } from '../../schemas';
import { useSelector } from 'react-redux';

const initialValues = {
  patinetname: '',
  age: '',
  email: '',
  consutime:''
};

const SingleConsultingTimeView = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const users = useSelector((state) => state.user.user);
  const [Data, SetData] = useState();
  const [Date, SetDate] = useState();
  const id = useParams();
  const consult_id = id['id'];
  console.log(consult_id);
  const getdata = async () => {
    const respons = await axiosInstance.post(`user/singledoctorbooking`, {
      id: consult_id,
    });
    console.log(respons.data);
    SetData(respons.data[0]);
    SetDate(respons.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  const { values,touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: patient,
    onSubmit: async (values, actions) => {
      try {
        const response = await api.post(`user/doctorbooking/`, {
          user: users.id,
          consutime: values.consutime,
          patientname: values.patinetname,
          age: values.age,
          email: values.email,
          doctor_id: Data.doctor_id,
          doctordetails: Data.doctordetail_id,
          
        });
        if (response.status === 201) {
          console.log(response.data);
          navigate(`/Booking_conformation/${response.data.id}`);
        } else {
          alert('not valid credentials');
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.response.data.message);
        console.log(error);
      }
      actions.resetForm();
    },
  });

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="w-full  flex flex-col items-center">
          <img
            className="h-20 w-20 rounded-[50%]"
            src={Data && `http://127.0.0.1:8000${Data.profilpic}`}
          />
          <p className="mt-2 font-semibold font-xl">
            Dr {Data && Data.first_name} {Data && Data.last_name}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>Specialization:</div>
            <div>{Data && Data.specialization}</div>
            <div>Clinic_Name:</div>
            <div>{Data && Data.clinic_name}</div>
            <div>Address:</div>
            <div>
              {Data && Data.Addressline1}
              <br />
              {Data && Data.Addressline2}
              <br />
              {Data && Data.district}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Add Patient Details</p>
          </div>
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className=" w-2/3 h-8 text-center mt-5 rounded-xl"
                placeholder="Name"
                name="patinetname"
                id="patinetname"
                value={values.patinetname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.patinetname && touched.patinetname?(<p className="Form_error">{errors.patinetname}</p>):null}
              <input
                type="text"
                className="w-2/3 h-8 text-center mt-5 rounded-xl"
                placeholder="Age"
                id="age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              /><br/>
             {errors.age && touched.age?(<p className="Form_error">{errors.age}</p>):null}
              <input
                type="text"
                className="w-2/3 h-8 text-center mt-5 rounded-xl"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              /><br/>
             {errors.email && touched.email?(<p className="Form_error">{errors.email}</p>):null}
              <select
               onChange={handleChange}
                className=" w-2/3 h-8 text-center mt-5 rounded-xl"
                name="consutime"
                id="consutime"
                placeholder="select Data and time"
                
                
              ><br/>
              <option>select Date</option>
                {Date?.map((dates, key) => (
                  <option key={key} value={dates.id}>
                    {dates.date} {dates.time_start} to {dates.time_end}{' '}
                  </option>
                ))}
              </select>
              {errors.consutime && touched.consutime?(<p className="Form_error">{errors.consutime}</p>):null}
              <button
                type="submite"
                className="mt-5 bg-sky-600 p-2 rounded-xl "
              >
                Book Apoinment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleConsultingTimeView;
