import React,{useState,useEffect} from 'react'
import useAxios from '../../Axios/useAxios';

const AdminDoctorView = () => {
    const[Data,SetData]=useState([])
  console.log(Data,"data")

    const api=useAxios()
    const get=async()=>{
     try{
      const request= await api.get(`Admin/doctorview/`)
      SetData(request.data)


     }catch(error)
     {
      console.log(error)

     }
  
    }
    useEffect(() => {
      get()
    },[]);

    const userblock = async (id)=>{
      try{
        const response= await api.post(`Admin/doctorview/`,{
        'id':id
        })
        get()

      }
      catch(error){
        console.log(error)

      }
    }
  return (
    <div className="grid grid-cols-6 gap-4 mt-10">
    <div class="col-start-1 col-end-3 ...">
      <div className="font-bold text-2xl">User List</div>
    </div>
    <div class="col-end-7 col-span-2 ...">
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-30">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="  text-gray-900 text-sm rounded-lg   w-30 pl-10 p-2.5  dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
    <div className="col-start-2 col-span-4 flex flex justify-around ...">
    <table class="w-full text-sm text-left text-black dark:text-black">
      <thead class="text-xs text-black uppercase  dark:bg-gray-50 dark:text-gray-700">
          <tr>
              
              <th scope="col" class="py-3 px-6">
                  User Id
              </th>
              <th scope="col" class="py-3 px-6">
                  Username
              </th>
              <th scope="col" class="py-3 px-6">
                  First Name
              </th>
              <th scope="col" class="py-3 px-6">
                  Last Name
              </th>
              <th scope="col" class="py-3 px-6">
                  Phone Number
              </th>
              <th scope="col" class="py-3 px-12">
                  Email
              </th>
              <th scope="col" class="py-3 px-10">
                  Status
              </th>
            
              <th scope="col" class="py-3 px-8">
                  Action
              </th>
          </tr>
      </thead>
      
        <tbody>
          {Data?.map((datas)=>(
            <tr className='bg-white border-b dark:bg-gray-200 dark:border-gray-100 hover:bg-gray-1000 dark:hover:bg-gray-300'>
               <td className='py-4 px-6'>{datas.id}</td>
               <td className='py-4 px-6'>{datas.username}</td>
               <td className='py-4 px-6'>{datas.first_name}</td>
               <td className='py-4 px-6'>{datas.last_name}</td>
               <td className='py-4 px-6'>{datas.phone_number}</td>
               <td className='py-4 px-6'>{datas.email}</td>
               <td className='py-4 px-6'>{datas.is_active?"Active":"Blocked"}</td>
               <td class="flex items-center py-8 px-8 space-x-3">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-4">{datas.is_active?<span className='' onClick={()=>userblock(datas.id)} >Block</span>:<span className='' onClick={()=>userblock(datas.id)}>Unblock</span>}</a>
                  
              </td>

            </tr>
           
          )
            
          )}

          
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default AdminDoctorView