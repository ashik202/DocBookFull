import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useAxios from '../../Axios/useAxios';
import { DoctorProfileSchema } from '../../schemas';
import { drinfo } from '../../redux/reducer/UserSlice';

const DoctorProinfoUpdate = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useAxios();
  const dr = useSelector((state) => state.user.profitinalinfo);
  console.log(dr);
  const users = useSelector((state) => state.user.user);
  const id = users.id;
  const initialValues = {
    regno: dr.regno,
    specialization: dr.specialization,
    clinic_Name: dr.clinic_name,
    address1: dr.Addressline1,
    address2: dr.Addressline2,
    map: dr.link_of_map,
    district: dr.district,
    state: dr.states,
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: DoctorProfileSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await api.put(`doctor/profile/`, {
          id: id,
          regno: values.regno,
          specialization: values.specialization,
          clinic_name: values.clinic_Name,
          Addressline1: values.address1,
          Addressline2: values.address2,
          link_of_map: values.map,
          district: values.district,
          state: values.state,
        });
        if (response.status === 201) {
          dispatch(drinfo(response.data));
          Navigate('/doctor_dashbord');
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(values);
  console.log(errors);
  return (
    <>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md  reg-back ">
        <h2 className="text-lg font-semibold text-black-700 capitalize dark:text-black-200">
          Doctor professional Info Update
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black-700 dark:text-black-200">
                regno
              </label>
              <input
                id="regno"
                name="regno"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md  dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.regno}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {<p className="Form_error">{errors.regno}</p>}
            </div>

            <div>
              <label className="text-black-700 dark:text-black-200">
                specialization
              </label>
              <input
                id="specialization"
                name="specialization"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md  dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.specialization}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {<p className="Form_error">{errors.specialization}</p>}
            </div>
            <div>
              <label className="text-black-700 dark:text-black-200">
                clinic_name
              </label>
              <input
                id="clinic_Name"
                name="clinic_Name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.clinic_Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              {<p className="Form_error">{errors.clinic_Name}</p>}
            </div>

            <div>
              <label className="text-black-700 dark:text-black-200">
                Addressline1
              </label>
              <input
                id="address1"
                name="address1"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.address1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {<p className="Form_error">{errors.address1}</p>}
            </div>
            <div>
              <label className="text-black-700 dark:text-black-200">
                Addressline2
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.address2}
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              {<p className="Form_error">{errors.address2}</p>}
            </div>

            <div>
              <label className="text-black-700 dark:text-black-200">
                link_of_map
              </label>
              <input
                id="map"
                name="map"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.map}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {<p className="Form_error">{errors.map}</p>}
            </div>
            <div>
              <label className="text-black-700 dark:text-black-200">
                district
              </label>
              <input
                id="district"
                name="district"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.district}
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              {<p className="Form_error">{errors.district}</p>}
            </div>

            <div>
              <label className="text-black-700 dark:text-black-200">
                state
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-black-200 rounded-md dark:text-black-300 dark:border-black-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {<p className="Form_error">{errors.state}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-6 ">
            <button
              type="submit"
              className="bg-indigo-700 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-black-700 rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DoctorProinfoUpdate;
