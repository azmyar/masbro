import {useState} from 'react'
import axios from 'axios'
import './index.css'

import userpict from '../img/user-pict.png'

import logo from '../img/logo.png'

import profile from '../img/profile.png'
import home from '../img/home.png'
import bros from '../img/bros.png'

import bro from '../img/bro.png'
import bestbro from '../img/bestbro.png'
import bront from '../img/bront.png'


const Users = () => {

    // Get bros post
    const[post,Post] = useState("");

    setTimeout( async function () {
        const postsGet = await axios.get(`http://localhost:8080/api/users`);
        Post(postsGet.data.reverse());
    }, 500)

    // Open Profile

    const openProfile = (username, bio, bros) => {
        sessionStorage.setItem("brosusername", username)
        sessionStorage.setItem("brosbio", bio)
        sessionStorage.setItem("brosbros", bros)
        window.location ='/brosprofile'
    }

    const output = []
    const message =[]

    try{
        for (let i = 0; i < post.length; i++) {

            if (post[i].username !== sessionStorage.getItem("username")){

                if (sessionStorage.getItem("bestbros").includes(post[i].username)){
                    output.push(
                        <div>
                            <div className="user-card" onClick={() => openProfile(post[i].username, post[i].bio, post[i].bros)}>
                                    <img src={userpict} className="profile-pict" alt="profile-pict"></img>
                                    <h3>{post[i].username}</h3>
                                    <img src={bestbro} className="status" alt="status" title='Your Best Bro'></img>                            
                            </div>
                            
                        </div>
                        )

                } else if (sessionStorage.getItem("bros").includes(post[i].username)){
                    
                    output.push(
                        <div>
                            <div className="user-card" onClick={() => openProfile(post[i].username, post[i].bio, post[i].bros)}>
                                    <img src={userpict} className="profile-pict" alt="profile-pict"></img>
                                    <h3>{post[i].username}</h3>
                                    <img src={bro} className="status" alt="status" title='Your Regular Bro'></img>                            
                                    </div>
                        </div>)
                } else {
                    output.push(
                        <div>
                            <div className="user-card" onClick={() => openProfile(post[i].username, post[i].bio, post[i].bros)}>
                                    <img src={userpict} className="profile-pict" alt="profile-pict" ></img>
                                    <h3>{post[i].username}</h3>
                                    <img src={bront} className="status" alt="status" title='Not Your Bro'></img>                            
                            </div>
                        </div>)
                }
            }

        }

        if (output.length === 0){
            message.push (<div className="users-message">no bros yet.<br/>invite your friends to join masbro.</div>)
        } else {
            message.push ('')
        }

        return (            
            <div className="users-container">

                <div className='navigation'>
                        <img src={logo} className="logo" alt="status" onClick={() => window.location.replace("/home")}></img>                            
                        <div className='menu'>
                            <img src={home} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/home")}></img>                            
                            <img src={bros} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/users")}></img>                            
                            <img src={profile} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                        </div>
                </div>

                <div className="users-list-container">
                    <p className='users-title'>bros.</p>
                    {message}
                    {output}
                </div>
            </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default Users;