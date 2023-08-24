import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const navigate = useNavigate();

    const handleYes = async () => {
        try {
            await axios.delete("/taskManager/deleteAccount", { withCredentials: true });
            localStorage.removeItem("isLogged");
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    const handleNo = () => {
        navigate("/");
    }

    return (
        <div>
            Are you sure you want to delete your account?<br/>
            <button onClick={handleYes}>yes</button>
            <button onClick={handleNo}>no</button>
        </div>
    )
}

export default DeleteAccount;