import { useState } from "react";
import "./Ticketbook.css";
import { useNavigate } from "react-router-dom";

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
    "Kanchipuram",
  ];

  const navigate = useNavigate();

  const [fromPlace, setFromPlace] = useState(area[0]);
  const [toPlace, setToPlace] = useState(area[1]);
  const [travelDate, setTravelDate] = useState("");
  const [busName, setBusName] = useState("Green Bus");
  const [seatNo, setSeatNo] = useState("");
  const [dateError, setDateError] = useState(false);
  const [seatError, setSeatError] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  const bookTicket = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone) {
      alert("You must be logged in to book. Redirecting to login.");
      navigate("/Loginpage");
      return;
    }

    let isValid = true;
    if (!fromPlace || !toPlace) {
      alert("Please select both From and To places");
      isValid = false;
    }
    if (fromPlace === toPlace) {
      alert("From and To cannot be the same");
      isValid = false;
    }
    if (!travelDate) {
      setDateError(true);
      isValid = false;
    }
    if (!seatNo) {
      setSeatError(true);
      isValid = false;
    }
    if (!isValid) return;

    const bookingData = {
      fromPlace,
      toPlace,
      travelDate,
      busName,
      seatNo: String(seatNo),
      passengerName: username,
      passengerEmail: email,
      passengerPhone: phone,
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const saved = await response.json();
        alert("Ticket Booked Successfully. Booking ID: " + saved.bookId);
        navigate("/Navigationpage");
      } else {
        const errorText = await response.text();
        alert("Booking Failed: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Backend Not Connected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="tickettitle">Ticket Booking</h1>
      <div className="ticketcontainer">
        <form onSubmit={bookTicket}>
          <label>From</label>
          <select
            value={fromPlace}
            onChange={(e) => setFromPlace(e.target.value)}
          >
            {area.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>

          <label>To</label>
          <select value={toPlace} onChange={(e) => setToPlace(e.target.value)}>
            {area.map((place) => (
              <option key={place} value={place} disabled={place === fromPlace}>
                {place}
              </option>
            ))}
          </select>

          <label>Bus</label>
          <select value={busName} onChange={(e) => setBusName(e.target.value)}>
            <option>Green Bus</option>
            <option>Red Bus</option>
            <option>Yellow Bus</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => {
              setTravelDate(e.target.value);
              setDateError(false);
            }}
          />

          {dateError && <p className="inputuser">Please choose a date</p>}

          <label>Seat No</label>
          <input
            type="number"
            value={seatNo}
            onChange={(e) => {
              setSeatNo(e.target.value);
              setSeatError(false);
            }}
            min="1"
          />
          {seatError && <p className="inputuser">Please enter seat number</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Ticketbook;
