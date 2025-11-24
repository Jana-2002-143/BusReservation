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
    setBtnuser(e.target.value);
    if (e.target.value.trim() !== "") setEmpty(false);
    else {
      setEmpty(true);
    }
  };

  const userpassword = (e) => {
    setBtnpass(e.target.value);
    if (e.target.value.trim() !== "") setPasskey(false);
    else {
      setPassKey(true);
    }
  };

  const funbtn = async (e) => {
    e.preventDefault();

    let error = false;

    if (!btnuser.trim()) {
      setEmpty(true);
      error = true;
    }

    if (!btnpass.trim()) {
      setPasskey(true);
      error = true;
    }

    if (error) return;

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: btnuser, password: btnpass }),
      });

      if (response.ok) {
        const data = await response.json();

        alert("Login Successful!");
        navigate("/Navigationpage");
      } else {
        alert("Invalid Username or Password");
      }
    } catch {
      alert("Cannot reach backend.");
    }
  };

  return (
    <>
      <h1 className="loginpagetitle">Bus Reservation</h1>
      <div className="container">
        <form onSubmit={funbtn} className="busform">
          <label>User Name</label>
          <input
            type="text"
            value={btnuser}
            onChange={userinput}
            placeholder="Username"
          />
          {empty && <p className="inputempty">Please enter name</p>}

          <label>Password</label>
          <input
            type="password"
            value={btnpass}
            onChange={userpassword}
            placeholder="Password"
          />
          {passkey && <p className="inputempty">Please enter password</p>}

          <button type="submit" className="formsubmit">
            Submit
          </button>

          <Link to="/Signup" className="newuser">
            New User ?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Loginpage;
