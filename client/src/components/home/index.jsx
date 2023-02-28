import './index.css'
import {useState} from 'react'
import axios from 'axios'
import Posts from './posts'

import logo from '../img/logo.png'

import profile from '../img/profile.png'
import home from '../img/home.png'
import bros from '../img/bros.png'

import postLogo from '../img/post.png'

const Home = () => {

    // Fetch activeUser
    const[activeUsername, Username] = useState("");
    // const[activeBio, Bio] = useState("");
    // const[activeBros, Bros] = useState("");
    // const[activeBestbros, Bestbros] = useState("");

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users/active?email=${localStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        Username(sessionStorage.getItem("username"))
        sessionStorage.setItem("bio", response.data[0].bio);
        // Bio(sessionStorage.getItem("bio"));
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        sessionStorage.getItem("bros");
        sessionStorage.setItem("bestbros", JSON.stringify(response.data[0].bestbros));
        // Bestbros(sessionStorage.getItem("bestbros"));
        sessionStorage.setItem("bestbroingme", JSON.stringify(response.data[0].bestbroingme));

    }
    
    getData()

    // Hide Show

    const [showPost, setShowDivs] = useState(false);
    const showPostPrompt = async() => {
        setShowDivs(!showPost);
    }

    // Posting Program

    const [bestBro, Switching] = useState (false)

    const date = new Date()

    const [inputVal, setInputVal] = useState("")

    const post = async() => {
        try{
            const url = "http://localhost:8080/api/post/"
            await axios.post(url, {post:inputVal,bestbro:bestBro,username: sessionStorage.getItem("username"),
            date:`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`})
        }catch(error){
            console.log(error)
        }
        showPostPrompt()        
    };

    // Return
    try{
    return(

        <div className="mainContainer">

            {showPost && (
                    <div className="bio-container">

                    <div className="bio-form-container">
        
                        <h1 className='post-title'>post.</h1>
                        <textarea className='bio-box' name ="post" placeholder="pour your thoughts." onChange={e => setInputVal(e.target.value)}></textarea>
                        <div className='bio-button-container'>
        
                            <input type="checkbox" class="post-bestbro-check"checked={bestBro} onChange={()=>Switching(!bestBro)}></input>
                            <p class="post-bestbro-text">Best Bro Only</p>
        
                            <button className='bio-submit' onClick={() => post()}>post</button>
                            <button className='bio-skip' onClick={() => showPostPrompt()} >cancel</button>
                        </div>
        
                    </div>
                </div>)}

            <div className='navigation'>
                <img src={logo} className="logo" alt="status" onClick={() => window.location.replace("/home")}></img>                            
                <div className='menu'>
                    <div className='post-tooltip-parent'>
                        <img src={home} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/home")}></img>
                        <span className="nav-tooltip">home.</span>  
                    </div>    
                    <div className='post-tooltip-parent'>
                        <img src={bros} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/users")}></img>   
                        <span className="nav-tooltip">bros.</span>
                    </div>    
                    <div className='post-tooltip-parent'>
                        <img src={profile} className="navigation-buttons" alt="status" onClick={() => window.location.replace("/profile")}></img>  
                        <span className="nav-tooltip">profile.</span>
                    </div>                          
                </div>
            </div>

            <div className="postContainer">
                <div className='home-title-container'>
                    <p className='home-title'>home.</p>
                    <div className="post-tooltip-parent">
                    <img src={postLogo} className="home-post-button" alt="status" onClick={() => showPostPrompt()}></img>    
                    <span className="post-tooltip">post.</span>
                    </div>

                </div>
                <Posts/>
            </div>
        </div>

    )}catch(error){
        console.log(error)
    }
   
}

export default Home;