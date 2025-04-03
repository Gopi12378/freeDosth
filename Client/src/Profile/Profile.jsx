import React from 'react';
import './Profile.css'; // Custom CSS for styling

export default function Profile({ show, handleClose, user }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>&times;</button>
                <div className="profile-header">
                    <img
                        src={user.profileImage || 'default-profile.png'}
                        alt="Profile"
                        className="profile-img"
                    />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>

                <div className="course-section">
                    <h3>Purchased Courses</h3>
                    <ul>
                        {user.purchasedCourses.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>

                    <h3>Completed Courses</h3>
                    <ul>
                        {user.completedCourses.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
