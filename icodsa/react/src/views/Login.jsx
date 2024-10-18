
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

import "../styles/login.css";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <body style={{ backgroundImage: `url('/bgfooter.jpg')` }}>
            <div >
                <div className="login">
                    <div className="container login-area text-center p-3 m-3">
                        <img src="/public/logo-icodis.png" alt="" />
                        <h1 className="mt-3 mb-1">Login</h1>
                        <div className="mb-3 text-start">
                            <div className="container">
                                <label htmlFor="inputUsername" className="form-label">Username</label>
                                <input type="text" className="form-control d-flex align-items-center justify-content-center" id="inputUsername" placeholder="Username" />
                            </div>

                            <div className="container mt-3">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                    />
                                    <i
                                        className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary col-5 m-3">Sign In</button>

                    </div>
                </div>
            </div>
        </body>)
}
