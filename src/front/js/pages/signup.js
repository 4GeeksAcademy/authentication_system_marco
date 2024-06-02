import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const Signup = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Resetting previous errors
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validation logic
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            return;
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            return;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.msg);
            }

            // Handle successful signup
            console.log("User signed up successfully!");
            navigate('/login'); // Navigate to login page
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    {confirmPasswordError && <Form.Text className="text-danger">{confirmPasswordError}</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit">Signup</Button>
            </Form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};