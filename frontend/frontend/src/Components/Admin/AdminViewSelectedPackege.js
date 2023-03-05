import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../Axios/useAxios';

const AdminViewSelectedPackege = () => {
    const[Data,SetData]=useState()
    const api=useAxios()
   const getdata=async()=>{
    try{
        const response=await api.get("Admin/viewselectedpackege/")
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
    <div>
        <div className="container ">
        <div className="grid ">
          <p className="justify-items-center mt-10 text-3xl font-bold">
            {' '}
            View Packege
          </p>
          <div className="flex justify-end">
            <p className="">
          
            </p>
          </div>
          <div className="grid text-center">
            <table class="table-auto mt-5">
              <thead>
                <tr>
                  <th className="mr-10">Id</th>
                  <th className="mr-5">Doctor Name</th>
                  <th className="mr-5">Packegename</th>
                  <th className="mr-5">Amound</th>
                  <th className="mr-5">Purches Date</th>
                  <th className="mr-5">Valid UpTo</th>
                  <th className="mr-5">Payment Id</th>
                  
                </tr>
              </thead>
              <tbody>
                {Data?.map((datas) => {return(
                  <tr>
                    <td>{datas&&datas.id}</td> 
                    <td>{datas&&datas.user.first_name}</td> 
                    <td>{datas&&datas.packege.packegename}</td> 
                    <td>{datas&&datas.packege.amound}</td> 
                    <td>{datas&&datas.date}</td> 
                    <td>{datas&&datas.enddate}</td> 
                    <td>{datas&&datas.payment.payment_id}</td> 
                    
                    
                    
                    
                  
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminViewSelectedPackege