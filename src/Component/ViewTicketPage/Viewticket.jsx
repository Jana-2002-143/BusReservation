import { useState } from "react";
import "./Viewticket.css";

function Viewticket() {
  const [busName, setBusName] = useState("");
  const [bookId, setBookId] = useState("");
  const [error, setError] = useState({});
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const phone = localStorage.getItem("phone");

  const viewTicket = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!bookId) newErrors.bookId = "Please enter Booking ID";
    if (!busName) newErrors.busName = "Please select a bus";
    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!phone) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://busbooking-backend-w4ip.onrender.com/api/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: bookId,
          busName: busName,
        }),
      });

      if (!res.ok) {
        alert(await res.text());
        setTickets([]);
        return;
      }

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error(err);
      alert("Error loading ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>View Ticket</h1>
      <div className="viewticketcontainer">
        <form onSubmit={viewTicket}>
          <label>Book Id</label>
          <input
            type="text"
            placeholder="Booking Id"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          {error.bookId && <p className="inputerror">{error.bookId}</p>}

          <label>Bus Name</label>
          <select value={busName} onChange={(e) => setBusName(e.target.value)}>
            <option value="">-- Select Bus --</option>
            <option>Green Bus</option>
            <option>Red Bus</option>
            <option>Yellow Bus</option>
          </select>
          {error.busName && <p className="inputerror">{error.busName}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "View Ticket"}
          </button>
        </form>

        {tickets.map((t) => (
          <div key={t.bookId} className="detailcontainer">
            <p>Passenger: {t.passengerName}</p>
            <p>Bus: {t.busName}</p>
            <p>Seat: {t.seatNo}</p>
            <p>Email: {t.passengerEmail}</p>
            <p>Phone: {t.passengerPhone}</p>
            <p>From: {t.fromPlace}</p>
            <p>To: {t.toPlace}</p>
            <p>Date: {t.travelDate}</p>
            <p>Booking ID: {t.bookId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewticket;
