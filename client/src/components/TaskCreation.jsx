import {React, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskCreation = () => {
    const [task, setTask] = useState({ taskName: "", dateOfCompletion: "" });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }

    const { taskName, dateOfCompletion } = task;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        axios.post("/taskManager/createTask", { taskName, dateOfCompletion }, { withCredentials: true }).then(() => {
            navigate("/");
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div className="form-container">
            <form className="form-element" onSubmit={handleSubmit}>
                Enter following fields to create task<br />
                <input
                    className="field-input"
                    type="text"
                    value={taskName}
                    onChange={handleChange}
                    name="taskName"
                    required
                    placeholder="Enter task name"
                /><br />
                <input
                    className="field-input"
                    type="date"
                    value={dateOfCompletion}
                    onChange={handleChange}
                    name="dateOfCompletion"
                    required
                    placeholder="Enter date"
                /><br />
                <button className="button-element">Create</button>
            </form>
            <div style={{color: "red", marginTop: "10px"}}>{err}</div>
        </div>
    )
}

export default TaskCreation