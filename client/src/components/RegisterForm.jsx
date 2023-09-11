import React, { useState, useEffect } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showRegistration, setShowRegistration] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await axios.get("http://localhost:3000/api/customers/status", { withCredentials: true });
                console.log("Status response:", response.status);
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    const serverMessage = response.data.message;
                    setMessage(serverMessage);
                    console.log(serverMessage);
                }
            } catch (error) {
                setIsLoggedIn(false);
                // alert("Please log in to proceed!");
                // setMessage("Please log in to proceed!");
                // console.error("Axios error:", error.response.status);
            }
        }
        checkAuthStatus();
    }, []);



    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/customers/login", { username, password },
                { withCredentials: true });
            if (res.status === 200) {
                setIsLoggedIn(true);
                setMessage(res.data.message);
                setShowRegistration(false);
            }
        } catch (err) {
            setIsLoggedIn(false);
            setShowRegistration(true);

            if (err.response && err.response.status === 401) {
                setMessage(err.response.data.message);

            } else {
                setMessage("An error occurred during login.");
            }
        }
    };


    const handleLogout = async () => {
        try {
            // Call the server's logout endpoint
            await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });

            // Remove token from localStorage if it's there
            localStorage.removeItem('token');

            // Update UI state
            setIsLoggedIn(false);
            setMessage("Logged out successfully!");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/customers/register", { username, password }, { withCredentials: true });
            if (res.status === 201) {  // Check for status 201 which means created
                setIsLoggedIn(true);  // Set user as logged in
                setMessage(res.data.message);
                setShowRegistration(false);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                // Get the error message from the server response
                setMessage(err.response.data.message || "An error occurred");
            } else {
                // Generic error message
                setMessage("An error occurred");
            }
        }
    };

    if (isLoggedIn) {
        return <div>{message}</div>;
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            <form className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Email"
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-1 py-0.5 text-xs rounded border border-gray-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete={showRegistration ? "new-password" : "current-password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-1 py-0.5 text-xs rounded border border-gray-300"
                />
                {showLogin ? (
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-white text-blue-500 text-xs px-1 py-0.5 rounded hover:bg-gray-200"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="bg-white text-blue-500 text-xs px-1 py-0.5 rounded hover:bg-gray-200"
                    >
                        Register
                    </button>
                )}
            </form>
            {showLogin ? (
                <span
                    onClick={() => { setShowLogin(false); setMessage("") }}
                    className="inline-block text-white text-xs px-1 py-0.5 rounded hover:bg-blue-400 cursor-pointer"
                >
                    Register
                </span>
            ) : (
                <span
                    onClick={() => { setShowLogin(true); setMessage("") }}
                    className="inline-block text-white text-xs px-1 py-0.5 rounded hover:bg-blue-400 cursor-pointer"
                >
                    Return to Login
                </span>
            )}

            <p className="text-white text-xs">{message}</p>
        </div>
    );

}

export default Register;