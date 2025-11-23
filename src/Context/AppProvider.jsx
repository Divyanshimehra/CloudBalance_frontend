import { useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
    const [userName, _setUserName] = useState(
        localStorage.getItem("username") || "User"
    );

    return (
        <AppContext.Provider value={{ userName }}>
            {children}
        </AppContext.Provider>
    )

}