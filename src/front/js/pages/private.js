import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const isLoggedIn = !!sessionStorage.getItem("token");
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []); // Run this effect only once, on component mount

    const handleLogout = () => {
        // Remove token from sessionStorage
        sessionStorage.removeItem("token");
        // Redirect to home page (public)
        navigate("/");
    };

    return (
        <div>
            <h2>Private Page</h2>
            <p>This is a private page accessible only to logged-in users.</p>
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
    );
};