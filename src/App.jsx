import { Routes, Route, Navigate } from "react-router-dom";
import Loginpage from './Component/MainPage/LoginPage/Loginpage';
import Ticketbook from './Component/BusBookingPage/Ticketbook';
import Viewticket from './Component/ViewTicketPage/Viewticket';
import Cancelbus from './Component/CancelBookpage/Cancelbus';
import Signup from "./Component/MainPage/SignUpPage/Signup";
import Navigationpage from './Component/NavigationPage/Navigationpage';
import './App.css';

function App() {
  return (
    <>git 
      <Routes>
        <Route path="/" element={<Navigate to="/Loginpage" />} />

        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Navigationpage" element={<Navigationpage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Ticketbook" element={<Ticketbook />} />
        <Route path="/Viewticket" element={<Viewticket />} />
        <Route path="/Cancelbus" element={<Cancelbus />} />
        {/* nantha */}

      </Routes>
    </>
  );
}

export default App;
