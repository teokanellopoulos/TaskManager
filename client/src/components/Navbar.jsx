import { React, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { UserData } from "../App";

const Navbar = () => {
    const { user, isLogged } = useContext(UserData);

    const handleLogout = async () => {
        try {
            await axios.get("/taskManager/logout");
            localStorage.removeItem("isLogged");
            window.location.href = "/";
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <nav>
            <ul>
                {
                    isLogged ?
                        <>
                            {user.userName}
                            <li><Link to="/">Menu</Link></li>
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        </> :
                        <>
                            <li><Link to="/">Menu</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default Navbar;