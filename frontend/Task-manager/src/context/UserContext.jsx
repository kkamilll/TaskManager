import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Przy inicjalizacji odczytujemy użytkownika z localStorage
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            // Jeśli mamy już użytkownika w localStorage, używamy go
            if (user) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                const userData = { ...response.data, token };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, []);

    // Aktualizacja użytkownika (np. po logowaniu lub edycji profilu)
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
    };

    // Wylogowanie użytkownika
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
