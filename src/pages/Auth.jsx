import React, { useState } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
    // State to control whether we're showing the login or register form
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);  // Loading state for API calls

    // Toggle between Login and Register forms
    const toggleForm = () => setIsLogin(prevState => !prevState);

    return (
        <div className="auth-container">
            {/* Display loading spinner when data is being fetched */}
            {loading && <div className="loading-spinner">Loading...</div>}

            {/* Conditionally render Login or Register based on isLogin state */}
            {isLogin ?
                <Login toggleForm={toggleForm} setLoading={setLoading} />
                : <Register toggleForm={toggleForm} setLoading={setLoading} />}
        </div>
    );
};

export default Auth;
