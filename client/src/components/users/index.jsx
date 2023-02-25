import {useState, useEffect} from 'react'
import axios from 'axios'

const Users = () => {

    // Get bros post
    const[post,Post] = useState("");

    setTimeout( async function () {
        const postsGet = await axios.get(`http://localhost:8080/api/users`);
        Post(postsGet.data);
    }, 500)

    // Return
    try{
        var output = ''
        for (let i = 0; i < post.length; i++) {
            output += `<div class="login">
                        ${post[i].username}
                        </div>`
        }
        return (
        <div dangerouslySetInnerHTML={{ __html : output}}/>)
    } catch (error) {
        console.log(error)
    }
}

export default Users;