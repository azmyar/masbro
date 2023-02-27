import {Posts} from './posts'

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
        <div>
        <div className="bio-container">

            <div className="bio-form-container">

                <button onClick={handleLogout}>Log out</button>
                <button onClick={editBio}>Edit bio</button>
                <h1>{sessionStorage.getItem("username")}</h1>
                <h2>{sessionStorage.getItem("bio")}</h2>
                {Posts(sessionStorage.getItem("username"))}

            </div>

        
        </div>
        </div>
    )

}

export default Profile;