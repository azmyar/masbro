import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './posts'

const Home = () => {
    // Logout
    const handleLogout = () =>{
        localStorage.removeItem("token");
        sessionStorage.clear();
        window.location.reload()
    }

    // Fetch activeUser

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users?email=${sessionStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        sessionStorage.setItem("bio", response.data[0].bio);
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        sessionStorage.setItem("bestbros", response.data[0].bestbros);
    }

    useEffect(()=>{
            getData()
    },[]);
    
    // Posting
    const [data, setPost] = useState ({
        username: "",
        date: "",
        post: "",
        bestbro: ""
    })

    const date = new Date()

    const handleChange = ({currentTarget: input}) => {
        setPost({...data, 
            username: sessionStorage.getItem("username"),
            date:`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, 
            [input.name]: input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const url = "http://localhost:8080/api/post/"
            await axios.post(url, data)
        }catch(error){
            console.log(error)
        }

        window.location.reload()
    }
    try{
    return(
        <div className="mainContainer">
            <div className="postContainer">
                <h1>Home.</h1>
                <p>{sessionStorage.getItem("username")}</p>
                <form onSubmit={handleSubmit}>
                    <input name = 'post' onChange = {handleChange}></input>
                    <button type="submit">Post</button>
                </form>
                <button onClick={handleLogout}>Log out</button>
                <Posts/>
            </div>

        </div>
    )}catch(error){
        console.log(error)
    }
   
}

export default Home;