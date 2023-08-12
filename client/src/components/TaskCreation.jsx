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
        axios.post("/taskManager/createTask", { taskName, dateOfCompletion }).then(() => {
            navigate("/");
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div>
            Enter the following fields to create task<br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskName}
                    onChange={handleChange}
                    name="taskName"
                    required
                    placeholder="Enter task name"
                /><br />
                <input
                    type="date"
                    value={dateOfCompletion}
                    onChange={handleChange}
                    name="dateOfCompletion"
                    required
                    placeholder="Enter date"
                /><br />
                <button>Create</button>
            </form>
            {err}
        </div>
    )
}

export default TaskCreation