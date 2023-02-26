import './index.css'
import {useState} from 'react'
import axios from 'axios'
import Posts from './posts'

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
        sessionStorage.setItem("bestbros", response.data[0].bestbros);
        // Bestbros(sessionStorage.getItem("bestbros"));
    }
    
    getData()

    // Set Date
    const date = new Date()

    // Posting

    const [bestBro, Switching] = useState (false)

    const [data, setPost] = useState ({})

    const handleChange = ({currentTarget: input}) => {
        setPost({ 
            username: activeUsername,
            date:`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            [input.name]: input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const url = "http://localhost:8080/api/post/"
            await axios.post(url, {...data,bestbro:bestBro})
        }catch(error){
            console.log(error)
        }
    }

    const gotoProfile  = ( ) => {
        window.location = "/profile"
    }
    const gotoUsers = ( ) => {
        window.location = "/users"
    }

    // tes dong
    try{
    return(

        <div className="mainContainer">
            <div className="postContainer">
                <h1>Home.</h1>
                <button onClick={gotoProfile}>profile</button>
                <button onClick={gotoUsers}>bros</button>
                <form onSubmit={handleSubmit}>
                    <input name = 'post' onChange = {handleChange}></input>
                    <button type="submit" >Post</button>
                </form>
                <input type="checkbox" checked={bestBro} onChange={()=>Switching(!bestBro)}></input>
                <p>Best Bro only</p>
                <Posts/>
            </div>
        </div>

    )}catch(error){
        console.log(error)
    }
   
}

export default Home;