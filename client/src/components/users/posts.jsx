import {useState, useEffect} from 'react'
import axios from 'axios'
import userpict from '../img/user-pict.png'
import bestbro from '../img/bestbro.png'
import './index.css'

export const Posts = (source) => {

    // Get bros post
    const[brospost,Post] = useState("");

    setTimeout( async function () {
        const active = source
        const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${active}`); // render bros only posts
        // const postsGet = await axios.get(`http://localhost:8080/api/post`); // render every posts
        Post(postsGet.data.reverse());
    }, 500)

    const output = [];
    const message = []

    // Return
    try{
        for (let i = 0; i < brospost.length; i++) {

            const bestBroValidation = sessionStorage.getItem("bestbroingme").includes(brospost[i].username)

                    if (brospost[i].bestbro && !bestBroValidation){}
                    else{

                        if (brospost[i].bestbro){

                            output.push(
                                <div className="user-post">
                            <div className="post-users">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <img src={bestbro} className="post-bestbro" alt="status" title="For Best Bro Only"></img>                            
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>

                            )}else {
                                output.push(
                                    <div className="user-post">
                                    <div className="post-users">
                                        <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                        <p className="post-username">{brospost[i].username}</p>
                                        <p className="post-date">{brospost[i].date}</p>
                                    </div>
                                    <p className="post-word">{brospost[i].post}</p>
                                </div>)
                            
                }}
        }
        if (output.length === 0){
            message.push (<div className="home-message">no posts yet.</div>)
        } else {
            message.push ('')
        }
        return (
        <div>
            <hr/>
            {message}
            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}