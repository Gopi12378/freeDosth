import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../App.css"
export default function Register() {
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", mobile: "", role: ""
    });
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handelSubmit(e) {
       e.preventDefault();
        try {
            const res = await axios.post("https://freedosth1.onrender.com/api/auth/signup", formData);
            console.log("User created successfully");
            console.log(res.data.r);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.r);
            setUser({ token: res.data.token, role: res.data.r });
            alert("User created successfully!");
            navigate("/")
            
        } catch (err) {
            console.error("Error creating user:", err.response?.data?.message || 'Something went wrong!');
            alert(err.response?.data?.message || 'Something went wrong!');
            
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ height: '100vh',
          backgroundImage: `url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,backgroundSize: 'cover',
          backgroundPosition: 'center', }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h2 className="text-center text-primary mb-4">Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input name="username" type="text" className="form-control" id="exampleInputName" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
                        <input name="mobile" type="text" className="form-control" id="exampleInputMobile" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputRole" className="form-label">Role</label>
                        <select
                            name="role"
                            className="form-control"
                            id="exampleInputRole"
                            onChange={handleChange}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={handelSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
