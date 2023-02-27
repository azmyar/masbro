import {Posts} from './posts'
import './index.css'

import logo from '../img/logo.png'

import profile from '../img/profile.png'
import home from '../img/home.png'
import bros from '../img/bros.png'

const Profile = () => {

    // Logout
    const handleLogout = () =>{
        sessionStorage.clear();
        localStorage.clear()
        window.location = '/home'
    }

    const editBio = () =>{
        window.location = '/bio'
    }

    return(
        <div className='main-container'>

            <div className='navigation'>
                    <img src={logo} className="logo" alt="status" onClick={() => window.location.replace("/home")}></img>                            
                    <div className='menu'>
                        <img src={home} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/home")}></img>                            
                        <img src={bros} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/users")}></img>                            
                        <img src={profile} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                    </div>
            </div>

            <div className="profile-container">

                <div className="profile-form-container">

                    <div className='profile-main'>
                        <img src={profile} className="profile-picture" alt="status"></img>                            
                        <div className='profile-username-container'>
                            <p className='profile-username'>{sessionStorage.getItem("username")}</p>
                            <div className='profile-button'>
                                <button className="profile-edit-bio" onClick={editBio}>Edit bio</button>
                                <button className="profile-logout" onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                    </div>
                    <p className='profile-bio'>{sessionStorage.getItem("bio")}</p>


                    {Posts(sessionStorage.getItem("username"))}

                </div>
        
            </div>
        </div>
    )

}

export default Profile;