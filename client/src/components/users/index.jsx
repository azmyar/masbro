import {useState, useEffect} from 'react'
import axios from 'axios'

const Users = () => {

    // Get bros post
    const[post,Post] = useState("");

    setTimeout( async function () {
        const postsGet = await axios.get(`http://localhost:8080/api/users`);
        Post(postsGet.data);
    }, 500)

    // Open Profile

    const openProfile = (username, bio, bros) => {
        sessionStorage.setItem("brosusername", username)
        sessionStorage.setItem("brosbio", bio)
        sessionStorage.setItem("brosbros", bros)
        window.location ='/brosprofile'
    }

    const output = []

    try{
        for (let i = 0; i < post.length; i++) {

            if (post[i].username != sessionStorage.getItem("username")){

                if (sessionStorage.getItem("bros").includes(post[i].username)){
                    output.push(
                        <div>
                        <div className="login" onClick={() => openProfile(post[i].username, post[i].bio, post[i].bros)}>
                                <h3>{post[i].username}</h3>
                        </div>
                        <p>your bro</p>
                        </div>
                        )

                } else {
                    
                    output.push(
                        <div>
                        <div className="login" onClick={() => openProfile(post[i].username, post[i].bio, post[i].bros)}>
                                <h3>{post[i].username}</h3>
                        </div>
                        <p>not your bro</p>
                        </div>)
                }
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

export default Users;