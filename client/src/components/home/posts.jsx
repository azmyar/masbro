import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Posts = () => {

    // Get bros post
    const[post,Post] = useState("");
    
    const getPost = async()=>{ 
        // console.log(JSON.parse(sessionStorage.getItem("bros"))[0])
        // const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${sessionStorage.getItem("username")}`);
        const postsGet = await axios.get(`http://localhost:8080/api/post/`);
        Post(postsGet.data);
    }

    useEffect(()=>{
        
        const seePost = async() =>{
            await getPost()
            getPost()
        }
        seePost()
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
