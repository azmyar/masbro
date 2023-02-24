import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './posts'

const Profile = () => {

    // Get bros post
    const[post,Post] = useState("");

    setTimeout( async function () {
        const postsGet = await axios.get(`http://localhost:8080/api/users`);
        Post(postsGet.data);
    }, 500)

    // Fetch activeUser
    const[activeUsername, Username] = useState("");
    const[activeBio, Bio] = useState("");
    const[activeBros, Bros] = useState("");
    const[activeBestbros, Bestbros] = useState("");

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users/active?email=${sessionStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        Username(sessionStorage.getItem("username"))
        sessionStorage.setItem("bio", response.data[0].bio);
        Bio(sessionStorage.getItem("bio"));
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        Bros(sessionStorage.getItem("bros"));
        sessionStorage.setItem("bestbros", response.data[0].bestbros);
        Bestbros(sessionStorage.getItem("bestbros"));
    }

    getData()

    return(
        <div>
        <h1>{activeUsername}</h1>
        <h2>{activeBio}</h2>
        <h3>{activeBros}</h3>
        <Posts/>
        </div>
    )


}

export default Profile;