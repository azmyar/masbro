import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Posts = () => {
    
    // Fetch username
    const[activeUser,setData]=useState("");

    const getData=async()=>{
        const response=await axios.get("http://localhost:8080/api/active");
        setData(response.data);
    }

    // Post Post
    

    // Get post
    const[post,Post] = useState("");
        
    const getPost = async()=>{
        const postsGet = await axios.get("http://localhost:8080/api/post");
        Post(postsGet.data);
    }

    useEffect(()=>{
        getPost()
    },[]);

    // Return
    try{
        var output = ''
        for (let i = 0; i < post.length; i++) {
            output += `<div class="login">
                        ${JSON.stringify(post[i].post)}
                        ${JSON.stringify(post[i].date)}
                        ${JSON.stringify(post[i].username)}</div>`
        }
        return <div dangerouslySetInnerHTML={{ __html : output}}/>
    } catch (error) {
        console.log(error)
    }
}

export default Posts
