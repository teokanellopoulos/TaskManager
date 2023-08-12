import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [credentials, setCredentials] = useState({ userName: "", password: "" });
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const { userName, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        axios.post("/taskManager/register", { userName, password }).then(() => {
            window.location.href = "/";
            localStorage.setItem("isLogged", true);
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div>
            Enter the following fields to create account<br/>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={credentials.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                    placeholder="Enter username"
                /><br />
                <input
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    name="password"
                    required
                    placeholder="Enter password"
                /><br />
                <button>Register</button>
            </form>
            {err}
        </div>
    )
}

export default Register;