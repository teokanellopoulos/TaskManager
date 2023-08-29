import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { id } = useParams();
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [task, setTask] = useState({
        taskname: "",
        dateofcompletion: ""
    });

    useEffect(() => {
        const getTask = async () => {
            try {
                const response = await axios.get("/taskManager/getTask", { params: { taskid: id }, withCredentials: true });
                setTask(response.data);
            } catch (error) {
                console.log(error)
            }
        }

        getTask();
        //eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }

    const { taskname, dateofcompletion } = task;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        axios.patch("/taskManager/updateTask", { id, taskname, dateofcompletion }, { withCredentials: true }).then(() => {
            navigate("/");
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-element">
                Update your task<br />
                <input
                    className="field-input"
                    type="text"
                    onChange={handleChange}
                    defaultValue={taskname}
                    name="taskname"
                    required
                    placeholder="Enter task name"
                /><br />
                <input
                    className="field-input"
                    type="date"
                    defaultValue={dateofcompletion}
                    onChange={handleChange}
                    name="dateofcompletion"
                    required
                    placeholder="Enter date"
                /><br />
                <button className="button-element">Update</button>
            </form>
            <div style={{color: "red", marginTop: "10px"}}>{err}</div>
        </div>
    )
}

export default UpdateTask;