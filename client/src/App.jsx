import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import { useEffect, useState, createContext } from "react";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import TaskCreation from "./components/TaskCreation";
import UpdateTask from "./components/UpdateTask";
import DeleteAccount from "./components/DeleteAccount";
import axios from "axios";

export const UserData = createContext();
axios.defaults.baseURL = "http://localhost:4000";

const App = () => {
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const cookieValue = Cookies.get('credentials');
        if (cookieValue !== undefined) {
            const credentials = JSON.parse(cookieValue.substring(2));
            setIsLogged(localStorage.getItem("isLogged"));
            setUser(credentials);
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <UserData.Provider value={{user, isLogged}}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/login" element={!isLogged ? <Login /> : <div>You are already logged in</div>} />
                        <Route path="/register" element={!isLogged ? <Register /> : <div>You are already logged in</div>} />
                        <Route path="/createTask" element={isLogged ? <TaskCreation /> : <div>You are not logged in</div>} />
                        <Route path="/updateTask/:id" element={isLogged ? <UpdateTask /> : <div>You are not logged in</div>} />
                        <Route path="/deleteAccount" element={isLogged ? <DeleteAccount/> : <div>You are not logged in</div>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </UserData.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App;
