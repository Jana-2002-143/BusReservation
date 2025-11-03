import './Navigationpage.css';
import { FaHome } from "react-icons/fa";
import { FaBus } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Navigationpage() {
    return (
        <>
            <h1 className='Navigatetitle'>Welcome to Royals</h1>

            <div className='Quotescontainer'>
                <p>For Travelling</p>
                <p>Book your Bus For Your Journey</p>
                <p>Go to your Destination Happily!!!</p>
            </div>

            <div className='navicons'>
                <div className='iconitem'>
                    <Link to="/Loginpage">
                        <FaHome id="icons" />
                        <label>Home</label>
                    </Link>
                </div>
                <div className='iconitem'>
                    <Link to="/Ticketbook">
                        <FaBus id="icons" />
                        <label>Book Ticket</label>
                    </Link>
                </div>
                <div className='iconitem'>
                    <Link to="/Viewticket">
                        <IoTicket id="icons" />
                        <label>View Ticket</label>
                    </Link>
                </div>
                <div className='iconitem'>
                    <Link to="/Cancelbus">
                        <MdCancel id="icons" />
                        <label>Cancel Ticket</label>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navigationpage;
