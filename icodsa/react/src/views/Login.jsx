
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // ----------------- Auth -----------------
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Kirimkan email dan password ke API login Laravel
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Simpan token ke localStorage
            localStorage.setItem('token', data.token);
            navigate('/dashboard');  // Arahkan ke dashboard setelah login sukses
        } else {
            alert('Login failed: ' + data.error);  // Tampilkan error jika login gagal
        }
    };

    return (
        <body style={{ backgroundImage: `url('/bgfooter.jpg')` }}>
            <div className="login">
                <div className="container login-area text-center p-3 m-3">
                    <img src="/public/logo-icodis.png" alt="" />
                    <h1 className="mt-3 mb-1">Login</h1>
                    <div className="mb-3 text-start">
                        <div className="container">
                            <label htmlFor="inputUsername" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control d-flex align-items-center justify-content-center"
                                id="inputUsername"
                                placeholder="Username"
                                value={email} // Memetakan state email ke input Username
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="container mt-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    value={password} // Memetakan state password ke input Password
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i
                                    className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                        </div>
                    </div>
                    {/* Pastikan button ini memicu handleLogin */}
                    <button
                        type="button"
                        className="btn btn-primary col-5 m-3"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </body>
    )
}
