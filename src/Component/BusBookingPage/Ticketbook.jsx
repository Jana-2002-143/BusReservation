import { useState, useEffect } from "react";
import "./Ticketbook.css";
import { useNavigate } from "react-router-dom";

function Ticketbook() {
  const area = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

  const navigate = useNavigate();

  const [fromPlace, setFromPlace] = useState(area[2]);
  const [toPlace, setToPlace] = useState(area[19]);
  const [travelDate, setTravelDate] = useState("");
  const [busName, setBusName] = useState("Green Bus");
  const [seatNo, setSeatNo] = useState("");
  const [dateError, setDateError] = useState(false);
  const [seatError, setSeatError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seatLoading, setSeatLoading] = useState(false);

  const [availableSeats, setAvailableSeats] = useState([]);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  const parseSafeJSON = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      if (!travelDate) return;

      setSeatLoading(true);

      try {
        const response = await fetch(
          "https://busbooking-backend-w4ip.onrender.com/api/checkSeat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              seatNo: 1,
              busName,
              travelDate,
            }),
          }
        );

        const text = await response.text();
        const result = parseSafeJSON(text);

        if (typeof result !== "string") {
          setAvailableSeats(result.availableSeats || []);
        }
      } catch (err) {
        console.log("Error fetching available seats", err);
      } finally {
        setSeatLoading(false);
      }
    };

    fetchAvailableSeats();
  }, [busName, travelDate, fromPlace, toPlace]);

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

    // ---------------- CHECK SEAT ----------------
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

    const checkText = await checkResponse.text();
    const checkResult = parseSafeJSON(checkText);

    if (typeof checkResult === "string") {
      alert(checkResult);
      setLoading(false);
      return;
    }

    setAvailableSeats(checkResult.availableSeats || []);

    if (checkResult.seatStatus === "UNAVAILABLE") {
      alert("❌ Seat already booked!");
      setLoading(false);
      return;
    }

    // ---------------- BOOK TICKET ----------------
    try {
      const response = await fetch(
        "https://busbooking-backend-w4ip.onrender.com/api/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromPlace,
            toPlace,
            travelDate,
            busName,
            seatNo: Number(seatNo),
            passengerName: username,
            passengerEmail: email,
            passengerPhone: phone,
          }),
        }
      );

      const resText = await response.text();
      const result = parseSafeJSON(resText);

      if (!response.ok) {
        alert("Booking Failed: " + resText);
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
            max="28"
          />
          {seatError && <p className="inputuser">Please enter seat number</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book"}
          </button>

          {travelDate && availableSeats.length > 0 && (
  <div className="available-seats">
    <h3>Select Your Seat</h3>

    <div className="bus-layout">
      {Array.from({ length: 7 }).map((_, row) => (
        <div className="seat-row" key={row}>

          {/* LEFT 2 SEATS */}
          <div className="seat-side">
            {[0, 1].map((col) => {
              const seatNoCalc = row * 4 + col + 1;
              const isAvailable = availableSeats.includes(seatNoCalc);
              const isSelected = seatNoCalc == seatNo;

              return (
                <div
                  key={seatNoCalc}
                  className={`seat-box 
                    ${isAvailable ? "available" : "booked"} 
                    ${isSelected ? "selected" : ""}
                  `}
                  onClick={() => (isAvailable ? setSeatNo(seatNoCalc) : null)}
                >
                  {seatNoCalc}
                </div>
              );
            })}
          </div>

          <div className="walkway"></div>

          {/* RIGHT 2 SEATS */}
          <div className="seat-side">
            {[2, 3].map((col) => {
              const seatNoCalc = row * 4 + col + 1;
              const isAvailable = availableSeats.includes(seatNoCalc);
              const isSelected = seatNoCalc == seatNo;

              return (
                <div
                  key={seatNoCalc}
                  className={`seat-box 
                    ${isAvailable ? "available" : "booked"} 
                    ${isSelected ? "selected" : ""}
                  `}
                  onClick={() => (isAvailable ? setSeatNo(seatNoCalc) : null)}
                >
                  {seatNoCalc}
                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  </div>
)}

        </form>
      </div>
    </>
  );
}

export default Ticketbook;
