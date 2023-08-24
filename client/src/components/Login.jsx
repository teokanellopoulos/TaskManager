import React, { useState } from 'react';
import axios from "axios";
import "../css/Login.css";

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
            Enter your credentials to login<br/>
            <form onSubmit={handleSubmit} className="form-element">
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
                <button>Login</button>
            </form>
            {err}
        </div>
    )
}

export default Login;