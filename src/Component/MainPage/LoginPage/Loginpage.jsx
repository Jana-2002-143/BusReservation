import { useState } from "react";
import "./Loginpage.css";
import { Link, useNavigate } from "react-router-dom";

function Loginpage() {
  const [empty, setEmpty] = useState(false);
  const [passkey, setPasskey] = useState(false);
  const [btnuser, setBtnuser] = useState("");
  const [btnpass, setBtnpass] = useState("");

  const navigate = useNavigate();

  const userinput = (e) => {
    const value = e.target.value;
    setBtnuser(value);
    if (value.trim() !== "") setEmpty(false);
  };

  const userpassword = (e) => {
    const value = e.target.value;
    setBtnpass(value);
    if (value.trim() !== "") setPasskey(false);
  };

  const funbtn = async (e) => {
    e.preventDefault();

    let error = false;
    if (btnuser.trim() === "") { setEmpty(true); error = true; }
    if (btnpass.trim() === "") { setPasskey(true); error = true; }
    if (error) return;

    const loginData = { username: btnuser, password: btnpass };

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // store user info
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phone);
        alert("Login Successful!");
        navigate("/Navigationpage");
      } else {
        const msg = await response.text();
        alert("Invalid Username or Password\n" + msg);
      }
    } catch (err) {
      alert("Cannot reach backend. Check server or port.");
    }
  };

  return (
    <>
      <h1 className="loginpagetitle">Bus Reservation</h1>
      <div className="container">
        <form onSubmit={funbtn} className="busform" id="busforms">
          <label htmlFor="username">User Name</label>
          <input type="text" placeholder="Username" id="username" className="userdetails" value={btnuser} onChange={userinput} />
          {empty && <p className="inputempty">Please enter name</p>}

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" className="keyword" value={btnpass} onChange={userpassword} />
          {passkey && <p className="inputempty">Please enter password</p>}

          <button type="submit" className="formsubmit">Submit</button>

          <Link to="/Signup" className="newuser">New User</Link>
          <p className="design">Already User?</p>
        </form>
      </div>
    </>
  );
}

export default Loginpage;
