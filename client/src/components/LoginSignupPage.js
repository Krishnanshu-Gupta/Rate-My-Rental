import React, { useContext, useState, useEffect } from 'react';
import './LoginSignupPage.css';
import Axios from "axios";
import {Outlet, useNavigate, Navigate } from "react-router-dom";
import AuthContext from './AuthContext';

const LoginSignupPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');

  const [listOfUsers, setListOfUsers] = useState([]);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
  };

  const { attemptLogin, setAttemptLogin } = useContext(AuthContext);

  useEffect(() => {
		Axios.get("http://localhost:3001/getUsers").then((response) => {
			setListOfUsers(response.data);
		});

	}, []);

  const createUser = async () => {
    Axios.post("http://localhost:3001/createUser", {
				email,
        password
			}).then((response) => {
				setListOfUsers([
					...listOfUsers,
					{
						email,
            password
					},
				]);

				console.log("Just created an account, " + response.data._id);

        alert("Account created successfully. Please log in now.");
        console.log(listOfUsers);
			}).catch((error) => {
				console.log(error);
			});
  }

  const findUser = async () => {
    for(let i = 0; i < listOfUsers.length; i++) {
      console.log("hi");
      if(listOfUsers[i].email === email && listOfUsers[i].password === password) return true;
    }
    console.log("nope");
    return false;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login/signup logic here using email and password

    if (activeTab === 'signin') {
      //console.log('Sign In:', email, password);
      const isValidLogin = listOfUsers.some(
        (user) => user.email === email && user.password === password
      );
      if(isValidLogin) {
        console.log("bye");
        setAttemptLogin(true);
        onClose()
        navigate("/");
        alert("Logged in successfully!")
      } else {
        console.log("hello");
        alert("Invalid login credentials, try again");
      }
    } else {
      //console.log('New Account:', email, password);
      createUser();
      // Call signup API or perform signup actions
    }
  };

  return (
    <div className="login-signup-popup">
      <div className="login-signup-container">
        <h1 className="login-signup-title">RateMyRental</h1>
        <div className="login-signup-tabs">
          <button
            className={`login-signup-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => handleTabClick('signin')}
          >
            Sign In
          </button>
          <button
            className={`login-signup-tab ${activeTab === 'newaccount' ? 'active' : ''}`}
            onClick={() => handleTabClick('newaccount')}
          >
            New Account
          </button>
        </div>
        <form className="login-signup-form" onSubmit={handleSubmit}>
          <label className="login-signup-label">
            Email:
            <input className="login-signup-input" type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
          </label>
          <br />
          <label className="login-signup-label">
            Password:
            <input className="login-signup-input" type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
          </label>
          {activeTab === 'newaccount' && (
            <div className="password-validation">
              <p className="password-validation-text">At least 8 characters</p>
              <p className="password-validation-text">Mix of letters and numbers</p>
              <p className="password-validation-text">At least 1 special character</p>
              <p className="password-validation-text">At least 1 lowercase letter and 1 uppercase letter</p>
            </div>
          )}
          <br />
          <button className="login-signup-button" type="submit">
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <button className="login-signup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginSignupPage;
