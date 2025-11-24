import { useState } from "react";
import "./Cancelbus.css";

function Cancelbus() {
  const [seatNo, setSeatNo] = useState("");
  const [busName, setBusName] = useState("");
  const [bookId, setBookId] = useState("");
  const [errors, setErrors] = useState({});
  const [cancelled, setCancelled] = useState(false);

  const cancelbtn = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!seatNo) newErrors.seatNo = "Enter seat number";
    if (!busName) newErrors.busName = "Select bus name";
    if (!bookId) newErrors.bookId = "Enter booking ID";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("https://busbooking-backend-w4ip.onrender.com/api/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatNo,
          busName,
          bookId,
        }),
      });

      if (res.ok) {
        setCancelled(true);
        alert(await res.text());
      } else {
        alert("Cancel Failed: " + (await res.text()));
      }
    } catch (err) {
      alert("Server not responding");
    }
  };

  return (
    <div className="cancel-container">
      <h1>Cancel Ticket</h1>
      <div className="Cancelticketcontainer">
        <form onSubmit={cancelbtn}>
          <label>Seat Number</label>
          <input
            type="number"
            value={seatNo}
            onChange={(e) => setSeatNo(Number(e.target.value))}
          />
          {errors.seatNo && <p className="inputerror">{errors.seatNo}</p>}

          <label>Bus Name</label>
          <select value={busName} onChange={(e) => setBusName(e.target.value)}>
            <option value="">-- Select Bus --</option>
            <option>Green Bus</option>
            <option>Red Bus</option>
            <option>Yellow Bus</option>
          </select>
          {errors.busName && <p className="inputerror">{errors.busName}</p>}

          <label>Booking ID</label>
          <input
            type="number"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          {errors.bookId && <p className="inputerror">{errors.bookId}</p>}

          <button type="submit">Cancel Ticket</button>

          {cancelled && <h2>Ticket Cancelled Successfully!</h2>}
        </form>
      </div>
    </div>
  );
}

export default Cancelbus;
