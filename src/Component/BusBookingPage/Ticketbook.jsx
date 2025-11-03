import './Ticketbook.css'

function Ticketbook() {
    const area = [
        "Chennai",
        "Coimbatore",
        "Madurai",
        "Tiruchirappalli",
        "Tirunelveli",
        "Erode",
        "Salem",
        "Vellore",
        "Thoothukudi",
        "Kanchipuram"
    ];
    return (
        <>
            <h1 className="tickettitle">Ticket Booking</h1>
            <div className='ticketcontainer'>
                <form action="ticketbooking">
                    <label
                        htmlFor="from">From</label>
                    <select
                        name="from"
                        id="from">
                        {area.map((place, index) =>
                        (<option
                            key={index}
                            value={place}>{place}</option>))}
                    </select>
                    <label
                        htmlFor="to">To</label>
                    <select
                        name="to"
                        id="to">
                        {area.map((place, index) =>
                        (<option
                            key={index}
                            value={place}>{place}</option>))}
                    </select>
                    <label
                        htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        placeholder="Date" />
                    <label
                        htmlFor="buses">Bus</label>
                    <select
                        name="buses"
                        id="buses">
                        <option>Green Bus</option>
                        <option>Red Bus</option>
                        <option>Blue Bus</option>
                        <option>Yellow Bus</option>
                    </select>
                    <label
                        htmlFor="bseatno">Seat No</label>
                    <input
                        type="number"
                        id="bseatno"
                        placeholder="Enter seat number" />
                    <button type='submit'>Book</button>
                    <label htmlFor='availableseats'>Available Seats</label>
                    <p id='availableseats' className='seatsnum'>Not Available</p></form>
            </div>
        </>
    )
}
export default Ticketbook