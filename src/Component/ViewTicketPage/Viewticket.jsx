import { useState } from 'react'
import './Viewticket.css'

function Viewticket() {
    const [userview,setUserview]=useState(false)

    const viewbtn=(e)=>{
        e.preventDefault();
        setUserview(true);
    }
    return (
        <>
            <h1 className='Viewtitle'>View Ticket</h1>
            <div className="viewticketcontainer">
                <form action="Viewticket">
                    <label
                        htmlFor="viewdate">Booked Date</label>
                        <input
                            type="date"
                            id="viewdate"
                            placeholder="Date" />
                    <label
                        htmlFor="vnum">Booked No</label>
                        <input
                            type="number"
                            id="vnum"
                            placeholder="Phone no" />
                    <button type='submit'onClick={viewbtn}>View</button>
                    {userview && <div><label htmlFor='ticketdetails'>Ticket Details</label>
                    <div id='ticketdetails' className='detailcontainer'>
                        <p>Username :<span></span></p>
                        <p>Bus Name :<span></span></p>
                        <p>Seat No  :<span></span></p>
                        <p>Email ID :<span></span></p>
                    </div>
                    </div>}
                </form>
            </div>
        </>
    )
}
export default Viewticket