import { useState } from 'react'
import './Cancelbus.css'

function Cancelbus() {
    const [user,setUser]=useState(false)

    const cancelbtn=(e)=>{
        e.preventDefault();
        setUser(true);
    }
    return(
    <>
       <h1>Cancel Ticket</h1>
            <div className="Cancelticketcontainer">
                <form action="cancelticket">
                    <label
                        htmlFor="seatno">Booked Seat No</label>
                        <input
                            type="seatno"
                            id="seatno"
                            placeholder="Seat No" />
                    <label
                        htmlFor="email">Booked Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email" />
                    <label
                        htmlFor="num">Booked No</label>
                        <input
                            type="number"
                            id="num"
                            placeholder="Phone no" />
                    <button type='submit' onClick={cancelbtn}>Cancel</button>
                    {user && <div id='ticketdetails' className='detailcontainer'>
                            <h1>Ticket Canceled !!!!!</h1>
                    </div>}
                </form>
            </div>
    </>
)
}
export default Cancelbus