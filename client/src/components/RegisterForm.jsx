import React, { useState, useEffect } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showRegistration, setShowRegistration] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setMessage("You are already logged in!");
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/customers/login", { username, password });
            console.log("Response from server:", res);
            const token = res.data.token;
            localStorage.setItem('token', token); // Save the token
            setIsLoggedIn(true);
            setMessage(res.data.message);
            setShowRegistration(false);
        } catch (err) {
            setShowRegistration(true);
            setMessage("User not found, please register.");
        }
    };

    // async function handleLogin(email, password) {
    //     try {
    //         const res = await axios.post('http://localhost:3000/api/customers/login', { username, password });
    //         const token = res.data.token;
    //         localStorage.setItem('token', token); // Save the token
    //         setIsLoggedIn(true);
    //         setMessage(res.data.message);
    //         setShowRegistration(false);
    //         // Handle login success
    //         // Maybe redirect to a different page
    //     } catch (error) {
    //         setShowRegistration(true);
    //         setMessage("User not found, please register.");
    //         // Handle login failure
    //         console.error("An error occurred while logging in:", error);
    //     }
    // }

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3000/register", { username, password });
            setMessage(res.data.message);
            setShowRegistration(false);
        } catch (err) {
            setMessage("Registration failed.");
        }
    };
    if (isLoggedIn) {
        return <div>You are already logged in!</div>;
    }
    return (
        <div>
            <form>
                <h1>{showRegistration ? "Registration" : "Login"}</h1>
                <input
                    type="text"
                    placeholder="Email"
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete={showRegistration ? "new-password" : "current-password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showRegistration ? (
                    <button type="button" onClick={handleRegister}>Register</button>
                ) : (
                    <button type="button" onClick={handleLogin}>Login</button>
                )}
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;