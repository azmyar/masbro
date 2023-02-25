import './index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Posts = () => {

    // Get bros post

    const brospost = []

    const[post,Post] = useState("");

    setTimeout( async function () { 

            let bros = "username=" + sessionStorage.getItem("username")
            const tes = JSON.parse(sessionStorage.getItem("bros"))
            for (let index = 0; index < tes.length; index++) {
                bros += "&username="
                bros += tes[index]
            }
            const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${bros}`);
            Post(postsGet.data);
        
    }, 500)

    for (let index = 0; index < post.length; index++) {
        brospost.push(post[index])
    }


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
