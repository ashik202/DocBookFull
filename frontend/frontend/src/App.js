
import './App.css';
import { BrowserRouter,Routes, Route  } from "react-router-dom";
import UserSignupPage from './Pages/UserSignupPage';

import UserLogin from './Pages/UserLoginPage';
import DoctotSignupPage from './Pages/DoctotSignupPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/doctor_signup" element={<DoctotSignupPage/>} />
      
      <Route path="/user_signup" element={ <UserSignupPage/> } />
      <Route path="/user_login" element={ <UserLogin/> } />
      
      </Routes>
      </BrowserRouter>
    

      
      
    </div>
  );
}

export default App;
