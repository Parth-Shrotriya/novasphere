import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

    const[isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user") 
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    //const storedUser = localStorage.getItem('user');
    //const [user, setUser] = useState(
        //storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
    //);
    
    const [events, setEvents] = useState([]);

    return (
        <AppContext.Provider 
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                events,
                setEvents
            }}>
            {children}
        </AppContext.Provider>
    );
};

