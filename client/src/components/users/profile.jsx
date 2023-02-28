import {Posts} from './posts'
import axios from 'axios'
import logo from '../img/logo.png'

import profile from '../img/profile.png'
import home from '../img/home.png'
import bros from '../img/bros.png'
import './index.css'

import bro from '../img/bro-dark.png'
import bestbro from '../img/bestbro-dark.png'
import bront from '../img/bront-dark.png'

import './index.css'

const brosProfile = () => {

    // Initial Fetch

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users/active?email=${localStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        sessionStorage.setItem("bio", response.data[0].bio);
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        sessionStorage.getItem("bros");
        sessionStorage.setItem("bestbros", JSON.stringify(response.data[0].bestbros));
    }

    getData()


    const beBro = async(username) => {
        await axios.post(`http://localhost:8080/api/users/bebro`, {username: sessionStorage.getItem("username"), bro:username})
    };

    const beBront = async(username) => {
        await axios.post(`http://localhost:8080/api/users/bebront`, {username: sessionStorage.getItem("username"), bro:username})
    };

    const beBestBro = async(username) => {
        await axios.post(`http://localhost:8080/api/users/bebestbro`, {username: sessionStorage.getItem("username"), bro:username})
    };

    const button = []
    const emblem = []



    if (sessionStorage.getItem("bestbros").includes(sessionStorage.getItem("brosusername"))){
        emblem.push(
            <img src={bestbro} className="users-status" alt="status" title='Your Best Bro'></img>                            
        )
        button.push(
            <button className="user-bront" onClick={() => beBront(sessionStorage.getItem("brosusername"))}>Be Bron't</button>
        )
    } else if (sessionStorage.getItem("bros").includes(sessionStorage.getItem("brosusername"))) {
        emblem.push(
            <img src={bro} className="users-status" alt="status" title='Your Regular Bro'></img>                            
            )
        button.push(
            <div>
            <button className="user-bro" onClick={() => beBestBro(sessionStorage.getItem("brosusername"))}>Be Best Bro</button>
            <button className="user-bront" onClick={() => beBront(sessionStorage.getItem("brosusername"))}>Be Bron't</button>
            </div>
        )
    } else {
        emblem.push(
            <img src={bront} className="users-status" alt="status" title='Not Your Bro'></img>                            
            )
        button.push(
            <button className="user-bro" onClick={() => beBro(sessionStorage.getItem("brosusername"))}>Be Bro</button>
        )}


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
                        <img src={profile} className="profile-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                        <div className='profile-username-container'>
                            <div className='users-emblem'>
                                <p className='profile-username'>{sessionStorage.getItem("brosusername")}</p>
                                {emblem}
                            </div>
                            <div className='profile-button'>
                                {button}
                            </div>
                        </div>
                    </div>
                    <p className='profile-bio'>{sessionStorage.getItem("brosbio")}</p>

                    {Posts(sessionStorage.getItem("brosusername"))}

                </div>
        
            </div>
        </div>
    )

}

export default brosProfile;