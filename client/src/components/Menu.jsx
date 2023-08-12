import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const navigate = useNavigate();
    const { isLogged } = useContext(UserData);
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            if (isLogged) {
                try {
                    const response = await axios.get("/taskManager/getAllTasks");
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
            await axios.patch("/taskManager/completeTask", { id });
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
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (id) => {
        navigate("/updateTask/" + id);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("/taskManager/deleteTask", { data: { taskid: id } });
            setUserTasks(userTasks.filter(task => task.taskid !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {isLogged ?
                <div>
                    <button onClick={handleCreate}>Create task</button>
                    {
                        userTasks.map((task, i) =>
                            <div key={i}>
                                {task.taskname} {task.dateofcompletion}
                                {task.status === true ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                                <button onClick={() => handleUpdate(task.taskid)}>Update</button>
                                <button onClick={() => handleDelete(task.taskid)}>Delete</button>
                                {task.status === false ? <button onClick={() => handleComplete(task.taskid)}>Complete</button> : <></>}
                            </div>
                        )
                    }
                </div>
                :
                <div>Welcome to taskManager. Login to create and manage your tasks</div>
            }
        </div>
    )
}

export default Menu;