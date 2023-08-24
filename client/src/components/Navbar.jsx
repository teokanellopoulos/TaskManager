import { React, useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { UserData } from "../App";
import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const { user, isLogged } = useContext(UserData);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get("/taskManager/logout", { withCredentials: true });
            localStorage.removeItem("isLogged");
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar">
            <div className="logo"><Link to="/" className="link" onClick={() => setIsNavOpen(!isNavOpen)}>TaskManager</Link></div>
            <div>
                <FontAwesomeIcon icon={faBars} className="bar" onClick={() => setIsNavOpen(!isNavOpen)}/>
                <ul className={`navbar-links ${isNavOpen ? "open" : ""}`}>
                    {
                        isLogged ?
                            <>
                                <li>{user.userName}</li>
                                <li><Link onClick={()=> setIsNavOpen(!isNavOpen)} to="/deleteAccount" className="link">Delete account</Link></li>
                                <li><Link to="/" onClick={handleLogout} className="link">Logout</Link></li>
                            </> :
                            <>
                                <li><Link onClick={()=> setIsNavOpen(!isNavOpen)} to="/login" className="link">Login</Link></li>
                                <li><Link onClick={()=> setIsNavOpen(!isNavOpen)} to="/register" className="link">Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;