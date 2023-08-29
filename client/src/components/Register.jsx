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
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-element">
                Enter the following fields to register<br/>
                <input
                    type="text"
                    value={credentials.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                    className="field-input"
                    placeholder="Enter username"
                /><br />
                <input
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    name="password"
                    required
                    className="field-input"
                    placeholder="Enter password"
                /><br />
                <button className="button-element">Register</button>
            </form>
            <div style={{color: "red", marginTop: "10px"}}>{err}</div>
        </div>
    )
}

export default Register;