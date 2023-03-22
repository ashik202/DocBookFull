
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
import AdminUserViewPage from './Pages/AdminUserViewPage';
import AdminDoctorViewpage from './Pages/AdminDoctorViewpage';
import OtpVerificationPage from './Pages/OtpVerificationPage';
import ConsultingTimeViewPage from './Pages/ConsultingTimeViewPage';
import SingleConsultingViewPage from './Pages/SingleConsultingViewPage';
import BookingConformPage from './Pages/BookingConformPage';
import DoctorViewBookingPage from './Pages/DoctorViewBookingPage';
import BookingViewUserpage from './Pages/BookingViewUserpage';
import PackageSelectPage from './Pages/PackageSelectPage';
import AdminViewPackegePage from './Pages/AdminViewPackegePage';
import AdminAddPackege from './Pages/AdminAddPackege';
import EditePackegePage from './Pages/EditePackegePage';
import AdminViewSelectedPackagePage from './Pages/AdminViewSelectedPackagePage';
import ChatPage from './Pages/ChatPage';
import { Conversations } from './Components/Chat/Conversations';
import UserRouts from './Routes/UserRouts';
import DoctorRoutes from './Routes/DoctorRoutes';
import AdminRoues from './Routes/AdminRoues';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/otpverification/:id" element={<OtpVerificationPage/>}/>
        <Route path="/" exact element={<LandingPage/>}/>

        <Route path="/doctor_signup" element={<DoctotSignupPage/>} />
        <Route element={<DoctorRoutes/>}>
        <Route path="/doctor_info" element={<DoctorDetailpage/>} />
        <Route path="/doctor_dashbord" element={<DoctorDashbordpage/>} />
        <Route path="/doctor_professionalinfoUpdate" element={<DoctorProinfoUpdatepage/>}/>
        <Route path="/doctor_basicinfoUpdate" element={<DoctorbasicInfoUpdate/>}/>
        <Route path="/doctor_addconsultingtime" element={<AddConsultingtime/>}/>
        <Route path='/doctor_viewconsution' element={<ViewConsultationtimePage/>}/>
        <Route path='/doctor_EditeCounsultingtime/:id' element={<EditConsultingtimePage/>}/>
        <Route path='/doctor_viewbooking' element={<DoctorViewBookingPage/>}/>
        <Route path='/doctor_viewpackage' element={<PackageSelectPage/>}/>
        </Route>
      
      <Route path="/user_signup" element={ <UserSignupPage/> } />
      <Route path="/user_login" element={ <UserLogin/> } />
      <Route element={<UserRouts/>}>
      <Route path="/user_dashbord" element={<UserDashbordPage/>}/>
      <Route path="/bookingviewuser" element={<BookingViewUserpage/>}/>
      <Route path="/user_profile_update" element={<UserProfileUpdatepage/>}/>
      <Route path="/Booking_conformation/:id" element={<BookingConformPage/>}/>
      <Route path='/SingleDoctorBookPage/:id' element={<SingleConsultingViewPage/>}/>
      </Route>
      <Route element={<AdminRoues/>}>
      <Route path="/Admin_userView" element={<AdminUserViewPage/>}/>
      <Route path="/Admin_doctorView" element={<AdminDoctorViewpage/>}/>
      <Route path="/adminviewpackegepage" element={<AdminViewPackegePage/>}/>
      <Route path="/adminviewselectedpackage" element={<AdminViewSelectedPackagePage/>}/>
      <Route path="/adminaddpackege" element={<AdminAddPackege/>}/>
      <Route path="/admineditepackege/:id" element={<EditePackegePage/>}/>
      </Route>

      <Route path='/DoctorBook' element={<ConsultingTimeViewPage/>}/>
      

      <Route path="/chat/:conversationName" element={<ChatPage/>}/>
     
      
    
      </Routes>
      </BrowserRouter>
    

      
      
    </div>
  );
}

export default App;
