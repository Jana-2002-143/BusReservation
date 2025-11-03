import './Signup.css'

function Signup() {
    return (<>
            <label
                htmlFor="repassword">Re Type-Password</label>
            <input
                type="password"
                placeholder="Re-Password"
                id="password"
                className="keyword" />
            <label
                htmlFor="email">Email</label>
            <input
                type="text"
                placeholder="Email"
                id="email"
                className="keyword" />
            <label
                htmlFor="phoneno">Phone No</label>
            <input
                type="number"
                placeholder="Phone No"
                id="phoneno"
                className="keyword" />
    </>)
}
export default Signup