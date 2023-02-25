import './index.css'
import {useState} from 'react'
import axios from 'axios'

const Posts = () => {

    // Get bros post

    const[post,Post] = useState("");

    setTimeout( async function () { 

            let bros = "username=" + sessionStorage.getItem("username")
            const tes = JSON.parse(sessionStorage.getItem("bros"))
            for (let index = 0; index < tes.length; index++) {
                bros += "&username="
                bros += tes[index]
            }
            const postsGet = await axios.get(`http://localhost:8080/api/post/bros?${bros}`);
            Post(postsGet.data.reverse());
        
    }, 500)

    // Delete Post
    
        const output = [];
        const deleteClick = async(id) => {
            await axios.post(`http://localhost:8080/api/post/delete`, {_id:id})
        };


    
    try{
        for (let i = 0; i < post.length; i++) {

            if (post[i].username == sessionStorage.getItem("username")) {

                output.push(
                    <div className="login">
                            {post[i].post}
                            {post[i].date}
                            {post[i].username}
                            <button onClick={() => deleteClick(post[i]._id)}>
                            Delete
                            </button>
                    </div>
                )
                
            } else {
                output.push(
                    <div className="login">
                            {post[i].post}
                            {post[i].date}
                            {post[i].username}
                    </div>
                )
            }
        }
        return (
        <div>
            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default Posts
