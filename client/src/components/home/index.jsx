import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './posts'

const Home = () => {

    //Logout
    const handleLogout = () =>{
        localStorage.removeItem("token");

        try{
            const url = "http://localhost:8080/api/active"
            axios.post(url)

        }catch(error){
            console.log(error)
        }

        window.location.reload()
    }

    // Fetch username
    const[activeUser,setData]=useState("");

    const getData=async()=>{
        const response=await axios.get("http://localhost:8080/api/active");
        setData(response.data);
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
            username: activeUser.username,
            date:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, 
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
    
    return(
        <div className="mainContainer">
            <div className="postContainer">
                <h1>Home.</h1>
                <p>{activeUser.username}</p>
                <form onSubmit={handleSubmit}>
                    <input name = 'post' onChange = {handleChange}></input>
                    <button type="submit">Post</button>
                </form>
                <button onClick={handleLogout}>Log out</button>
                <Posts/>
            </div>

        </div>
    )
   
}

export default Home;