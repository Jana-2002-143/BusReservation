import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [btnuser, setBtnuser] = useState("");
  const [btnpass, setBtnpass] = useState("");
  const [btnrepass, setBtnrepass] = useState("");
  const [btnemail, setBtnemail] = useState("");
  const [btnphoneno, setBtnphoneno] = useState("");

  const funsignbtn = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!btnuser.trim()) newErrors.user = "Please enter name";
    if (!btnpass.trim()) newErrors.pass = "Please enter password";
    if (!btnrepass.trim()) newErrors.repass = "Please enter Retype password";
    if (btnpass !== btnrepass) newErrors.match = "Passwords do not match";
    if (!btnemail.trim()) newErrors.email = "Please enter email";
    if (!btnphoneno.trim()) newErrors.phone = "Please enter phone number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("https://busbooking-backend-43kz.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: btnuser,
          password: btnpass,
          email: btnemail,
          phone: btnphoneno,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phone);

        alert("Account Created");
        navigate("/Navigationpage");
      } else {
        alert("Signup Failed");
      }
    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <>
      <h1 className="signpagetitle">Bus Reservation</h1>
      <div className="container">
        <form onSubmit={funsignbtn} className="busform">
          <label>User Name</label>
          <input
            type="text"
            placeholder="UserName"
            onChange={(e) => setBtnuser(e.target.value)}
          />
          {errors.user && <p className="inputempty">{errors.user}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setBtnpass(e.target.value)}
          />
          {errors.pass && <p className="inputempty">{errors.pass}</p>}

          <label>Re Type-Password</label>
          <input
            type="password"
            placeholder="ReType Password"
            onChange={(e) => setBtnrepass(e.target.value)}
          />
          {errors.repass && <p className="inputempty">{errors.repass}</p>}
          {errors.match && <p className="inputempty">{errors.match}</p>}

          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setBtnemail(e.target.value)}
          />
          {errors.email && <p className="inputempty">{errors.email}</p>}

          <label>Phone No</label>
          <input
            type="text"
            placeholder="Phoneno"
            onChange={(e) => setBtnphoneno(e.target.value)}
          />
          {errors.phone && <p className="inputempty">{errors.phone}</p>}

          <button type="submit" className="formsubmit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
