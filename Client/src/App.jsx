import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './Navigation/Navigation'
import Register from './Register/Register'
import Home from "./Home/Home"
import Login from "./Login/Login"
import AddCourse from './AddCourse/AddCourse'
import Profile from './Profile/Profile'
export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Navigation/>
    <Routes>
    <Route path="/" element={<Home/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/add-course" element={<AddCourse/>}/>
     <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}
