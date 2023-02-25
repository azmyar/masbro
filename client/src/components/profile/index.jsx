import {Posts} from './posts'
import { useState } from 'react';

const Profile = () => {

    // Logout
    const handleLogout = () =>{
        localStorage.removeItem("token");
        sessionStorage.clear();
        window.location = '/home'
    }

    const editBio = () =>{
        window.location = '/bio'
    }

    return(
        <div>
        <button onClick={handleLogout}>Log out</button>
        <button onClick={editBio}>Edit bio</button>
        <h1>{sessionStorage.getItem("username")}</h1>
        <h2>{sessionStorage.getItem("bio")}</h2>
        {Posts(sessionStorage.getItem("username"))}
        </div>
    )

}

export default Profile;