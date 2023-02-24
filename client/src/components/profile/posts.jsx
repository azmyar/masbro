import {useState, useEffect} from 'react'
import axios from 'axios'

const Posts = () => {

    // Get bros post
    const[post,Post] = useState("");

    setTimeout( async function () {
        const tes = sessionStorage.getItem("username")
        const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${tes}`);
        // const postsGet = await axios.get(`http://localhost:8080/api/post`);
        Post(postsGet.data);
    }, 500)

    // Return
    try{
        var output = ''
        for (let i = 0; i < post.length; i++) {
            output += `<div class="login">
                        ${post[i].post}
                        ${post[i].date}
                        ${post[i].username}
                        </div>`
        }
        return (
        <div dangerouslySetInnerHTML={{ __html : output}}/>
        )
    } catch (error) {
        console.log(error)
    }
}

export default Posts
