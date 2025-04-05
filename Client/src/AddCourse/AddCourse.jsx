import React,{useState,useContext,useEffect} from 'react'
import axios from "axios"
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./AddCourse.css"
export default function AddCourse() {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({coursename:"",price:"",mentorname:"",nooflectures:"",imageUrl:""})
    const {user,setUser}=useContext(AuthContext)
    
    function handleChange(e){
      console.log(e);
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    function handelSubmit(e){
        try{
            e.preventDefault()
            
            console.log(formData);
            axios.post("https://freedosth1.onrender.com/api/course/add", formData, {
                headers: { Authorization: user.token }
            })
            .then((res)=>{
                if(res.status==200){
                    setUser({token:res.data.token,role:res.data.role})
                }
                
                alert("ADD Succcessfuly")
                navigate("/")
            })
            }
            catch(err){
              
            }
            
        }
    
  return (
    <div className='container p-4 mt-5' style={{backgroundColor:'white'}}>
      <div className='row d-flex flex-row justify-content-center'>
       <form >
  
  
  <div className="form-floating mb-3">
  <input name="coursename" type="text" onChange={handleChange} className="form-control input" id="coursename" />
  <label htmlFor="coursename">Course:</label>
</div>
<div className="form-floating mb-3">
  <input name="price" type="number" onChange={handleChange}  className="form-control input" id="price" />
  <label htmlFor="price">Pice:</label>
</div>
<div className="form-floating mb-3">
  <input name="mentorname" type="text" onChange={handleChange} className="form-control input" id="mentorname"/>
  <label htmlFor="mentorname">MentorName:</label>
</div>
<div className="form-floating mb-3">
  <input name="nooflectures" type="text" onChange={handleChange}  className="form-control input" id="nooflectures" />
  <label htmlFor="nooflectures">NoofLectrues:</label>
</div>
<div className="form-floating mb-3">
  <input name="imageUrl" type="text"  onChange={handleChange}   className="form-control input" id="imageUrl" />
  <label htmlFor="imageUrl">imageUrl:</label>
</div>
  
  <button type="submit" className="btn btn-primary" onClick={handelSubmit}>ADD</button>
    </form>
    </div>
    </div>
  )

}
