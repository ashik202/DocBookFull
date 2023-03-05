import React,{useEffect, useState} from 'react'
import useAxios from '../../Axios/useAxios';
import { useSelector } from 'react-redux';


const PackegeView = () => {
  const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
  }
  const [Data,SetData]=useState(null)

  const api=useAxios()
  const id= useSelector((state) => state.user.docuser.id);
  const getdata= async()=>{
    try{
      const respons= await api.get(`doctor/ViewSelectedPackege/${id}`);
      
      SetData(respons.data)
  

    }
    catch(error){
      console.log(error);

    }
   

  }
  useEffect(()=>{
    getdata()

  },
  [])
  console.log(Data&&Data);
  return (
    <>
    <div class="grid grid-cols-6 gap-4">
  <div class="col-start-2 col-span-4 ..." id="printablediv">
    <p className='font-bold text-lg'>Your Selected Packege</p>
    <div className='grid grid-cols-2 mt-5'>
      <div className='w-full h-100'>
        <p className='font-semibold'>Packege Details</p>
        <div className='grid grid-cols-2 mt-4'>
          <p className='mt-2'>Packege Name</p><p className='mt-2'>{Data&&Data.packege.packegename}</p>
          <p className='mt-2'>Packege Duration</p><p className='mt-2'>{Data&&Data.packege.packeduration}</p>
          <p className='mt-2' >Packege Amount</p><p className='mt-2'>{Data&&Data.packege.amound}</p>
          <p className='mt-2'>Duration</p><p>{Data&&Data.date} to {Data&&Data.enddate} </p>
        </div>


      </div>
      <div className='w-full h-100'>
      <p className='font-semibold'>Payment Details</p>
      <div className='grid grid-cols-2 mt-4'>
      <p>Payment Date</p><p>{Data&&Data.payment.created_date}</p>
          <p className='mt-2'>Payment Id</p><p className='mt-2'>{Data&&Data.payment.payment_id}</p>
          <p className='mt-2'>Payment Amount</p><p className='mt-2'>{Data&&Data.payment.amount}</p>
          <p className='mt-2'>Payment Status</p><p className='mt-2'>{Data&&Data.payment.status}</p>

      </div>
      </div>
    </div>
  
    
  

  
  
    <button type="button" onClick={Print} > Print div</button>
  
  </div>
  
  
</div>






    </>
  )
}

export default PackegeView