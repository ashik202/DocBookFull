
import './App.css';
import { BrowserRouter,Routes, Route  } from "react-router-dom";
import UserSignupPage from './Pages/UserSignupPage';

import UserLogin from './Pages/UserLoginPage';
import DoctotSignupPage from './Pages/DoctotSignupPage';
import UserDashbordPage from './Pages/UserDashbordPage';
import LandingPage from './Pages/LandingPage';
import UserProfileUpdatepage from './Pages/UserProfileUpdatepage';
import DoctorDetailpage from './Pages/DoctorDetailpage';
import DoctorDashbordpage from './Pages/DoctorDashbordpage';
import DoctorProinfoUpdatepage from './Pages/DoctorProinfoUpdatepage';
import DoctorbasicInfoUpdate from './Components/DoctorProfileUpdate/DoctorbasicInfoUpdate';
import AddConsultingtime from './Pages/AddConsultingtime';
import { ViewConsultationtimePage } from './Pages/ViewConsultationtimePage';
import EditConsultingtimePage from './Pages/EditConsultingtimePage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage/>}/>
        <Route path="/doctor_signup" element={<DoctotSignupPage/>} />
        <Route path="/doctor_info" element={<DoctorDetailpage/>} />
        <Route path="/doctor_dashbord" element={<DoctorDashbordpage/>} />
        <Route path="/doctor_professionalinfoUpdate" element={<DoctorProinfoUpdatepage/>}/>
        <Route path="/doctor_basicinfoUpdate" element={<DoctorbasicInfoUpdate/>}/>
        <Route path="/doctor_addconsultingtime" element={<AddConsultingtime/>}/>
        <Route path='/doctor_viewconsution' element={<ViewConsultationtimePage/>}/>
        <Route path='/doctor_EditeCounsultingtime/:id' element={<EditConsultingtimePage/>}/>
      
      <Route path="/user_signup" element={ <UserSignupPage/> } />
      <Route path="/user_login" element={ <UserLogin/> } />
      <Route path="/user_dashbord" element={<UserDashbordPage/>}/>
      <Route path="/user_profile_update" element={<UserProfileUpdatepage/>}/>
      
      
      </Routes>
      </BrowserRouter>
    

      
      
    </div>
  );
}

export default App;
