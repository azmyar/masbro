import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () =>{

    const handleLogout = () =>{
        localStorage.removeItem("token");
        window.location.reload()
    }

    const[activeUser,setData]=useState("");

    const getData=async()=>{
        const response=await axios.get("http://localhost:8080/api/auth");
        setData(response.data);
    }

    useEffect(()=>{
        getData()
    },[]);
    
    return(
        <div className="mainContainer">
            <div className="postContainer">
                <h1>Home.</h1>
                <h1>{activeUser.username}</h1>
                <button onClick={handleLogout}>Log out</button>
            </div>

        </div>
    )
    
}

export default Home;