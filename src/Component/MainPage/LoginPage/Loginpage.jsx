import { useState } from 'react'
import Signup from '../SignUpPage/Signup';
import './Loginpage.css'

function Loginpage() {
    const [user, setUser] = useState(false)

    const newadd = (e) => {
        e.preventDefault();
        setUser(true);
    };
    return (
        <>
            <h1 className='loginpagetitle'>Bus Reservation</h1>
            <div className="container">
                <form action="login" className="busform">
                    <label
                        htmlFor="username">User Name</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="userdetails" />
                    <label
                        htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="keyword" />
                    {user && <Signup />}
                    <div>
                        <button
                            type='submit'
                            className='formsubmit'>Submit</button>
                        <a
                            href='#'
                            className='newuser'
                            onClick={newadd}>New User</a>
                        <p className='design'> ? Already User</p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Loginpage