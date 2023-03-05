import React ,{useState,useEffect}from 'react'
import useAxios from '../../Axios/useAxios';
import { Link } from 'react-router-dom';

const AdminPackageView = () => {
    
    

    const[Data,SetData]=useState()
    const api=useAxios()
   const getdata=async()=>{
    try{
        const response=await api.get("Admin/Packege")
        console.log(response.data);
        SetData(response.data)
        
    }
    catch(error){
        console.log(error);

    }


   }
   useEffect(() => {
    getdata()
  },[]);


  return (
    <>
    <div className="container ">
        <div className="grid ">
          <p className="justify-items-center mt-10 text-3xl font-bold">
            {' '}
            View Packege
          </p>
          <div className="flex justify-end">
            <p className="">
            <Link to="/adminaddpackege">

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
                  <th className="mr-10">Id</th>
                  <th className="mr-5">Packege Name</th>
                  <th className="mr-5">Amound</th>
                  <th className="mr-5">Duration</th>
                  
                </tr>
              </thead>
              <tbody>
                {Data?.map((datas) => (
                  <tr>
                    <td>{datas.id}</td>
                    <td>{datas.packegename}</td>
                    <td>{datas.packeduration}</td>
                    <td>{datas.amound}</td>
                    
                    
                    
                    <td>
                      <div class="inline-flex">
                        <Link to={`/admineditepackege/${datas.id}`}>
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
  )
}

export default AdminPackageView