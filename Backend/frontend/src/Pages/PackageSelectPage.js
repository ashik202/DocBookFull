import React from 'react'
import PackgeSelect from '../Components/DoctorDashbord/PackgeSelect'
import PackegeView from '../Components/DoctorDashbord/PackegeView'
import { useSelector } from 'react-redux';
import DoctotHeader from '../Components/DoctorDashbord/DoctotHeader';

const PackageSelectPage = () => {
  const users = useSelector((state) => state.user.profitinalinfo);
  return (
    <>
    <DoctotHeader/>
    <br/>
    <br/>
    {users && users.payment?<PackegeView/>:<PackgeSelect/>}
        
    </>
  )
}

export default PackageSelectPage