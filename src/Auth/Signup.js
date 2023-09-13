import React, { useState } from 'react';
import './styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {


    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const navigate = useNavigate()
  
    function handleEmailChange(event) {
      // Update the email state when the input value changes
      setEmail(event.target.value);
    }
    
    function handlePasswordChange(event){
      setPassword(event.target.value);
    }

    function handleNameChange(event){
        setName(event.target.value);
      }
  
    const signup = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post('http://192.168.1.153:8000/auth/signup', {
              email,
              password,
              name
          });
  
          if (response.data.error){
            return
          }
          localStorage.setItem('token', response.data.token);
          console.log(response.data);
          navigate('chats');

          
      } catch (error) {
          console.log('error', error);
      }
  };

    return (
        <div className="signup-form">
            <input type="text" placeholder="Email or Username" className="input" value={email} onChange={handleEmailChange}/><br />
            <input type="text" placeholder="Your Name" className="input"  value={name} onChange={handleNameChange}/><br />
            <input type="password" placeholder="Password" className="input" value={password}  onChange={handlePasswordChange}/><br />
            <div className="btn" onClick={signup}>Create account</div>
        </div>
    );
}

export default Signup;
