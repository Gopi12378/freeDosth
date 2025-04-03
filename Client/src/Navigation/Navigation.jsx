import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="d-flex justify-content-between p-3 bg-dark shadow">
            <div>
                <Link to="/" className="btn btn-light">Home</Link>
            </div>
            <div className="d-flex gap-3 align-items-center">
               

                {user ? (
           <>
           {
    user.role==="undefined" &&(
        <>
        <Link to="/register" className="btn btn-outline-light">Register</Link>
        <Link to="/login" className="btn btn-outline-light">Login</Link>
        </>
    )
}

        {user.role === "user" && (
            <>
                <Link to="/profile" className="d-flex align-items-center">
                    <img 
                        src={user.image || "default-profile-image-url"} 
                        alt="Profile"
                        className="rounded-circle border border-light"
                        style={{ width: '40px', height: '40px' }}
                    />
                </Link>
                <Link onClick={logout} className="btn btn-danger">Logout</Link>
            </>
        )}
        {user.role === "admin" && (
            <>
                <Link to="/add-course" className="btn btn-warning">Add Course</Link>
                <Link onClick={logout} className="btn btn-danger">Logout</Link>
            </>
        )}
    </>
    
) : (
    <>
        <Link to="/register" className="btn btn-outline-light">Register</Link>
        <Link to="/login" className="btn btn-outline-light">Login</Link>
    </>
)}

            </div>
        </nav>
    );
}
