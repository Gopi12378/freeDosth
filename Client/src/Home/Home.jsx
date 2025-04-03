import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    
    {console.log(user)}
    useEffect(() => {
        fetchCourses();
    }, []);

    async function fetchCourses() {
        try {
            const res = await axios.get("http://localhost:4000/api/course/");
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
            setError("Failed to load courses. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const filteredCourses = courses.filter((course) =>
        course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <h3 className="text-center">Loading Courses...</h3>;
    }


    function handelDelete(e){
           try{
            console.log(user.user.token)
            axios.delete(`http://localhost:4000/api/course/${e}`,  {
                headers: { Authorization: user.user.token }
            })
            .then((res)=>{
                console.log(res.data)
                setCourses(res.data)
            })
        
           }
           catch(err){
              console.log(err);
           }

    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Welcome to feerDosth</h1>

            <div className="input-group mb-4 w-50 mx-auto">
                <input
                    type="text"
                    placeholder="Search for courses..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="row d-flex flex-row">
                <h2>Courses</h2>

                {filteredCourses.length > 0 ? (
                    filteredCourses.map((courseItem) => (
                        <div key={courseItem._id} className="card col-md-3 m-4" style={{ width: "18rem" }}>
                            <img src={courseItem.imageUrl} className="card-img-top" alt="Course Image" />
                            <div className="card-body">
                                <p className="card-text fw-bold">Course: {courseItem.coursename}</p>
                                <p className="card-text fw-bold">Mentor Name: {courseItem.mentorname}</p>
                                <p className="card-text fw-bold">Number Of Lectures: {courseItem.nooflectures}</p>
                                <p className="card-text fw-bold">Price: {courseItem.price}</p>
                            </div>

                            {user?.user?.role === "admin" && (
    <button className="btn btn-danger m-2" onClick={() => handelDelete(courseItem._id)}>Delete Course</button>
)}


<button className="btn btn-primary m-2">Watch Playlist</button>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100">No courses found.</p>
                )}
            </div>
        </div>
    );
}
