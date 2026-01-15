import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiClient";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {

    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [activeAccount, setActiveAccount] = useState(null);

    const [loading, setLoading] = useState(() => !!token);

    useEffect(() => {
        if (!token) return;

        apiFetch("/auth/profile")
        .then((response) => {
            if (!response.ok) throw new Error("Unauthorized");
            return response.json();
        })
        .then((user) => {
            setUser(user);
        })
        .catch(() => {
            localStorage.removeItem("token");
            setUser(null);
        })
        .finally(() => {
            setLoading(false);
        });
    },[token]);

    return (
        <UserContext.Provider value={{ user, setUser, loading , activeAccount, setActiveAccount}}>
            {children}
        </UserContext.Provider>
    );
}