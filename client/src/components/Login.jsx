import React, { useState } from 'react';
import axios from "axios";

const Login = () => {

    const [credentials, setCredentials] = useState({userName: "", password: ""});
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    }

    const { userName, password} = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        axios.post("/auth/login", { userName, password }).then(() => {
            localStorage.setItem("firstLogin", true);
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={credentials.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                    placeholder="Enter username"
                /><br/>
                <input
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

export default Login