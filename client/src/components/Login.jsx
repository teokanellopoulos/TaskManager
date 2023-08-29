import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [credentials, setCredentials] = useState({userName: "", password: ""});
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value});
    }

    const { userName, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        axios.post("/taskManager/login", { userName, password }, { withCredentials: true }).then(() => {
            window.location.href = "/";
            localStorage.setItem("isLogged", true);
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-element">
            Enter your credentials to login<br/>
                <input
                    className="field-input"
                    type="text"
                    value={credentials.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                    placeholder="Enter username"
                /><br/>
                <input
                    className="field-input"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    name="password"
                    required
                    placeholder="Enter password"
                /><br/>
                <button className="button-element">Login</button>
            </form>
            <div style={{color: "red", marginTop: "10px"}}>{err}</div>
        </div>
    )
}

export default Login;