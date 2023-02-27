import { Route, Routes, Navigate } from "react-router-dom";
import Home from './components/home'
import Login from './components/auth/login'
import Bio from './components/home/bio'
import Signup from './components/auth/signup'
import Users from './components/users'
import Profile from './components/profile'
import BrosProfile from './components/users/profile'

function App (){
    const user = localStorage.getItem("token")
    return(
        <Routes>
            {user && 
            <Route path="/" exact element={<Home/>} />}
            <Route path="/" exact element = {<Navigate replace to="/login"/>}/>

            {user && 
            <Route path="/home" exact element={<Home/>} />}
            <Route path="/home" exact element = {<Navigate replace to="/login"/>}/>

            {user && 
            <Route path="/bio" exact element={<Bio/>} />}
            <Route path="/bio" exact element = {<Navigate replace to="/login"/>}/>

            {user && 
            <Route path="/users" exact element={<Users/>} />}
            <Route path="/users" exact element = {<Navigate replace to="/login"/>}/>
            
            {user && 
            <Route path="/brosprofile" exact element={<BrosProfile/>} />}
            <Route path="/brosprofile" exact element = {<Navigate replace to="/login"/>}/>

            {user && 
            <Route path="/profile" exact element={<Profile/>} />}
            <Route path="/profile" exact element = {<Navigate replace to="/login"/>}/>


            <Route path="/signup" exact element = {<Signup/>}/>
            <Route path="/login" exact element = {<Login/>}/>

        </Routes>
    )
}

export default App