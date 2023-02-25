import Posts from './posts'
import { useState } from 'react';

const Profile = () => {

    // Logout
    const handleLogout = () =>{
        localStorage.removeItem("token");
        sessionStorage.clear();
        window.location = '/home'
    }

    return(
        <div>
        <button onClick={handleLogout}>Log out</button>
        <h1>{sessionStorage.getItem("username")}</h1>
        <h2>{sessionStorage.getItem("bio")}</h2>
        <h3>{sessionStorage.getItem("bros")}</h3>
        <Posts/>
        </div>
    )


}

export default Profile;