import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './css/login.css';
import axios from 'axios';

const Login = () => {
    const { auth, setAuth, remember, setRemember } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const emailRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleEmailChange = event => {
        event.preventDefault();
        setEmail(event.target.value);
    };
    const handlePasswordChange = event => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem("remember", remember);
    }, [remember]);

    const handleSubmit = async event => {
        event.preventDefault();
        console.log("submitting...");
        axios.post('https://localhost:7074/api/authenticate/login', { email: email, password: password})
        .then(function(res) {
            console.log(res.data);
            const accessToken = res.data?.accessToken;
            const email = res.data?.email;
            const firstName = res.data?.firstName;
            const lastName = res.data?.lastName;
            setAuth({ email, firstName, lastName, accessToken });
            setEmail("");
            setPassword("");
            navigate("/salerno/items");
        })
        .catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing EmployeeID or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('No account exists for this employeeID');
            } else if (err.response?.status === 404) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Login Failed');
            }
        });
        // axios({
        //     method: 'POST',
        //     url: 'https://localhost:7074/api/authenticate/login',
        //     data: {
        //         email: email,
        //         password: password
        //     },
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then(function(res) {
        //     const accessToken = res.data?.accessToken;
        //     const email = res.data?.email;
        //     const firstName = res.data?.firstName;
        //     const lastName = res.data?.lastName;
        //     setAuth({ email, firstName, lastName, accessToken });
        //     setEmail("");
        //     setPassword("");
        //     navigate("/salerno/items");
        // })
        // .catch(err => {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing EmployeeID or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('No account exists for this employeeID');
        //     } else if (err.response?.status === 404) {
        //         setErrMsg(err.response.data.message);
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        // });
    }

  return (
    <div className="Login">
        <div className="Login_Container">
            <h3 style={{margin: 0}}>Sign In</h3>
            <div className="Login_Form">
                <div>
                    <label className="Login_Form_Input_Label" htmlFor='email'>Email</label>
                </div>
                <input className="Login_Form_Input_Text" type='text' id='email' ref={emailRef} onChange={handleEmailChange} value={email} />
                <div>
                    <label className="Login_Form_Input_Label" htmlFor='password-input'>Password</label>
                </div>
                <input className="Login_Form_Input_Text" type='password' id='password-input' placeholder="Password" onChange={handlePasswordChange} value={password}/>
                <div>
                    <label htmlFor='remember-me-input'>Remember Me</label>
                    <input type='checkbox' name='remember-me-input' id='remember-me-input'/>
                </div>
                <button type='submit' onClick={handleSubmit} id='login-button'>Submit</button>
            </div>
        </div>
    </div>
  );
}

export default Login;