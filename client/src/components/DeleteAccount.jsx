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
        <div className="delete-container">
            Are you sure you want to delete your account?<br/>
            <div>
                <button className="yes" onClick={handleYes}>yes</button>
                <button className="no" onClick={handleNo}>no</button>
            </div>
        </div>
    )
}

export default DeleteAccount;