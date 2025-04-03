import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../App.css";

export default function Login() {
    const [info, setinfo] = useState({ email: "", password: "" });
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Load user data on component mount
    

    function handleChange(e) {
        setinfo({ ...info, [e.target.name]: e.target.value });
    }

    function handelSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:4000/api/auth/login", info)
            .then((res) => {
                if (res.status === 200) {
                    const userData = { token: res.data.token, role: res.data.role };
                    localStorage.setItem("user", JSON.stringify(userData));  // ✅ Save to localStorage
                    setUser(userData);
                    alert("Login success");
                    navigate("/");
                }
            })
            .catch((error) => {
                alert(error.response?.data?.message || 'Something went wrong!');
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h2 className="text-center text-dark mb-4">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={handelSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
