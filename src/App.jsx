import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Loginpage from './Component/MainPage/LoginPage/Loginpage'
import Ticketbook from './Component/BusBookingPage/Ticketbook'
import Viewticket from './Component/ViewTicketPage/Viewticket'
import Cancelbus from './Component/CancelBookpage/Cancelbus'
import Navigationpage from './Component/NavigationPage/Navigationpage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigationpage />
      <Routes>
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Ticketbook" element={<Ticketbook />} />
        <Route path="/Viewticket" element={<Viewticket />} />
        <Route path="/Cancelbus" element={<Cancelbus />} />
      </Routes>
    </>
  )
}

export default App
