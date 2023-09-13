import React, { useState } from 'react';
import './styles/Login.css';
import Login from './Login'; // Import your Login and Signup components here
import Signup from './Signup'; // Replace with the actual paths

function AuthScreens() {
    const [isLogin, setIsLogin] = useState(true); // Initialize isLogin state

    const segmentLoginSwitcher = () => {
        setIsLogin(true); // Toggle the isLogin state
    }

    const segmentSignupSwitcher = () => {
        setIsLogin(false); // Toggle the isLogin state
    }

    return (
        <div className="wrapper">
            <div className="contain">
                <div className={'login '+(!isLogin?'inActive-Segment':"")} onClick={segmentLoginSwitcher}>Log In</div>
                <div className={'signup '+(isLogin?'inActive-Segment':"")} onClick={segmentSignupSwitcher}>Sign Up</div>


                {isLogin ? <Login /> : <Signup />} {/* Conditional rendering based on isLogin */}
            </div>
        </div>
    );
}

export default AuthScreens;
