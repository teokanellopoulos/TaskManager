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
                const response = await axios.get("/taskManager/getTask", { params: { taskid: id } });
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
        axios.patch("/taskManager/updateTask", { id, taskname, dateofcompletion }).then(() => {
            navigate("/");
        }).catch((error) => {
            setErr(error.response.data.msg);
        });
    }

    return (
        <div>
            Update your task<br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    defaultValue={taskname}
                    name="taskname"
                    required
                    placeholder="Enter task name"
                /><br />
                <input
                    type="date"
                    defaultValue={dateofcompletion}
                    onChange={handleChange}
                    name="dateofcompletion"
                    required
                    placeholder="Enter date"
                /><br />
                <button>Update</button>
            </form>
            {err}
        </div>
    )
}

export default UpdateTask;