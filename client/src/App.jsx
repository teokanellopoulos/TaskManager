import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import { useEffect, useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";

export const UserData = createContext();

const App = () => {
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        // Get the value of the 'myCookie' cookie
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
                        <Route path="/login" element={!isLogged ? <Login /> : "You are already logged in"} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </UserData.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App;
