import { useState } from "react";
import "./Ticketbook.css";
import { useNavigate } from "react-router-dom";

function Ticketbook() {
  const area = [
    "Chennai",
    "Pudukkottai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Tirunelveli",
    "Erode",
    "Salem",
    "Vellore",
    "Pattukkottai",
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

  const [availableSeats, setAvailableSeats] = useState([]);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  const parseSafeJSON = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return text; // return pure string
    }
  };

  const bookTicket = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone) {
      alert("You must be logged in to book. Redirecting to login.");
      navigate("/Loginpage");
      return;
    }

    let isValid = true;

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

    setLoading(true);

    // ------- SAFE PARSE (no stream errors) -------
    const checkResponse = await fetch(
      "https://busbooking-backend-w4ip.onrender.com/api/checkSeat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatNo: Number(seatNo),
          busName,
          travelDate,
        }),
      }
    );

    const checkText = await checkResponse.text(); // read ONCE
    const checkResult = parseSafeJSON(checkText); // convert later

    if (typeof checkResult === "string") {
      alert(checkResult);
      setLoading(false);
      return;
    }

    setAvailableSeats(checkResult.availableSeats || []);

    if (checkResult.seatStatus === "UNAVAILABLE") {
      alert(
        "❌ Seat already booked!\n\nAvailable seats:\n" +
          (checkResult.availableSeats?.join(", ") || "None")
      );
      setLoading(false);
      return;
    }

    const bookingData = {
      fromPlace,
      toPlace,
      travelDate,
      busName,
      seatNo: Number(seatNo),
      passengerName: username,
      passengerEmail: email,
      passengerPhone: phone,
    };

    // ---------------- BOOKING ----------------
    try {
      const response = await fetch(
        "https://busbooking-backend-w4ip.onrender.com/api/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const resText = await response.text(); // read ONCE
      const result = parseSafeJSON(resText);

      if (!response.ok) {
        alert("Booking Failed: " + resText);
        setLoading(false);
        return;
      }

      if (typeof result === "string") {
        alert(result);
        setLoading(false);
        return;
      }

      alert("Ticket Booked Successfully. Booking ID: " + result.bookId);
      navigate("/Navigationpage");
    } catch (err) {
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
            min={new Date().toISOString().split("T")[0]}
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
            max="40"
          />
          {seatError && <p className="inputuser">Please enter seat number</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book"}
          </button>
        </form>

        {availableSeats.length > 0 && (
          <div className="available-seats">
            <h3>Available Seats</h3>
            <p>{availableSeats.join(", ")}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Ticketbook;
