import React, { useState } from 'react';
import './styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  function handleEmailChange(event) {
    // Update the email state when the input value changes
    setEmail(event.target.value);
  }
  
  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  const login = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://192.168.1.153:8000/auth/login', {
            email,
            password
        });

        if (response.data.error){
          return
        }
        localStorage.setItem('token', response.data.token);
        console.log(response.data);

        navigate('chats');
        
    } catch (error) {
        console.log('error');
    }
};
    return (
        <div className="login-form">
            <input type="text" placeholder="Email or Username" className="input" value={email} onChange={handleEmailChange}/><br />
            <input type="password" placeholder="Password" className="input" value={password}  onChange={handlePasswordChange}/><br />
            <div className="btn" onClick={login}>log in</div>
        </div>
    );
}

export default Login;
