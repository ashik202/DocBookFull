import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import useAxios from '../../Axios/useAxios';


const EditePakcege = () => {
const Navigate = useNavigate();
  const [Data, SetData] = useState(0);
  const api = useAxios();
  const sid = useParams();
  const id = sid['id'];
  console.log(id,"cc")
  const postrequest = async () => {
    const response = await api.get(`Admin/Packegeedit/${id}`);
    console.log(response.data);
    SetData(response.data);
  };
  useEffect(() => {
    postrequest();
  }, []);
  const initilValues = {
    id:Data.id,
    amound: Data.amound,
    packeduration: Data.packeduration,
    packegename: Data.packegename,
   
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
  useFormik({
    initialValues: initilValues,
    enableReinitialize: true,
    
    

    onSubmit: async (values, action) => {
      try {
        const response = await api.put(`Admin/Packege`, {
            id:Data.id,
            packegename: values.packegename,
            packeduration: values.packeduration,
            amound: values.amound,
          
        });
        if (response.status === 200) {
            Navigate("/adminviewpackegepage*/")

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
<>
     <div className="grid justify-items-center">
    
    
    <form onSubmit={handleSubmit}>
    <div className="col-start-2 col-span-4">
      <p className="font-bold  ">Add Packege</p>
      
      <div className="grid grid-cols-2 m-5 justify-items-start">
        <div className='mt-3'>packegename</div>
        <div>
        <input
            type="text"
            name="packegename"
            id="packegename"
            className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
            value={values.packegename}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<p className='Form_error'>{errors.packegename}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 m-5 justify-items-start">
        <div className='mt-3'>packeduration</div>
        <div>
          <input
            type="number"
            name="packeduration"
            id="packeduration"
            className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
            value={values.packeduration}
              onChange={handleChange}
              onBlur={handleBlur}
          />{<p className='Form_error'>{errors.packeduration}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 m-5 justify-items-start">
        <div>Amound</div>
        <div>
          <input
            type="number"
            name="amound"
            id="amound"
            className="block w-40 h-10 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ml-5"
            value={values.amound}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<p className='Form_error'>{errors.amound}</p>}
        </div>
      </div>
     
      <button
            type='submit'
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
      
    </div>
    </form>
  </div>




    </>
  )
}

export default EditePakcege