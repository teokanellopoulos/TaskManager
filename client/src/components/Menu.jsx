import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Menu.css";

const Menu = () => {
    const navigate = useNavigate();
    const { isLogged } = useContext(UserData);
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            if (isLogged) {
                try {
                    const response = await axios.get("/taskManager/getAllTasks", { withCredentials: true });
                    setUserTasks(response.data.sort((a, b) => {
                        if (!a.status && b.status) {
                            return -1;
                        }
                        // Sort incomplete tasks after completed tasks
                        if (a.status && !b.status) {
                            return 1;
                        }

                        return 0;
                    }));
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getAllTasks();
    }, [isLogged]);

    const handleCreate = () => {
        navigate("/createTask");
    }

    const handleComplete = async (id) => {
        try {
            await axios.patch("/taskManager/completeTask", { id }, { withCredentials: true });
            let targetIndex = userTasks.findIndex(task => task.taskid === id);

            const updatedTasks = [...userTasks];
            updatedTasks[targetIndex] = { ...updatedTasks[targetIndex], status: true };
            setUserTasks(updatedTasks.sort((a, b) => {
                if (!a.status && b.status) {
                    return -1;
                }
                // Sort incomplete tasks after completed tasks
                if (a.status && !b.status) {
                    return 1;
                }

                return 0;
            }));
            toast.success("Task completed");
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (id) => {
        navigate("/updateTask/" + id);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("/taskManager/deleteTask", { data: { taskid: id }, withCredentials: true });
            setUserTasks(userTasks.filter(task => task.taskid !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {isLogged ?
                <div className="task-container">
                    <button onClick={handleCreate} className="button-element">Create task</button>
                    {
                        userTasks.map((task, i) =>
                            <div key={i} className="task" style={{animationDelay: `${i * 0.1}s`}}>
                                Task: {task.taskname}<br /> 
                                Date: {task.dateofcompletion}<br />
                                Status: {task.status === true ? "Finished" : "Not finished"}
                                <div className="choice">
                                    {task.status === false && <FontAwesomeIcon className="edit" icon={faEdit} onClick={() => handleUpdate(task.taskid)} />}
                                    <FontAwesomeIcon className="delete" icon={faTrashCan} onClick={() => handleDelete(task.taskid)} />
                                    {task.status === false && <FontAwesomeIcon className="complete" icon={faFlagCheckered} onClick={() => handleComplete(task.taskid)} />}
                                </div>
                            </div>
                        )
                    }
                </div>
                :
                <div className="welcome">Welcome to taskManager. Login to create and manage your tasks</div>
            }
            <ToastContainer />
        </div>
    )
}

export default Menu;