import { useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
    const [userName, setUserName] = useState(
        localStorage.getItem("username") || "User"
    );

    const updateUserName = (name) => {
        localStorage.setItem("username", name);
        setUserName(name);
    }

    return (
        <AppContext.Provider value={{ userName, updateUserName }}>
            {children}
        </AppContext.Provider>
    )

}