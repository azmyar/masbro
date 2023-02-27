import {useState, useEffect} from 'react'
import axios from 'axios'
import userpict from '../img/user-pict.png'
import edit from '../img/edit.png'
import postdelete from '../img/delete.png'
import bestbro from '../img/bestbro.png'
import './index.css'

export const Posts = (source) => {

    // Get bros post
    const[brospost,Post] = useState("");

    setTimeout( async function () {
        const active = source
        const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${active}`); // render bros only posts
        // const postsGet = await axios.get(`http://localhost:8080/api/post`); // render every posts
        Post(postsGet.data.reverse());
    }, 500)

    // Handle Change for Edit Post

    const [post, setPost] = useState ({})

    const handleChange = ({currentTarget: input}) => {
        setPost(input.value)
    }

    const output = [];

    // Edit Post

    const [showDivs, setShowDivs] = useState(false);
    const showEditPrompt = async() => {
        setShowDivs(!showDivs);
    }

    const saveID = async(id) => {
        sessionStorage.setItem('editID', id)
    }

    const editClick = async() => {
        await axios.post(`http://localhost:8080/api/post/edit`, {_id:sessionStorage.getItem('editID'),post})
        sessionStorage.removeItem('editID')
        setShowDivs(!showDivs)
    };

    // Delete Post
    const deleteClick = async(id) => {
        await axios.post(`http://localhost:8080/api/post/delete`, {_id:id})
    };


    // Return
    try{
        for (let i = 0; i < brospost.length; i++) {

            if (brospost[i].bestbro){
                output.push(
                        <div className="user-post">
                            <div className="post">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <img src={bestbro} className="post-bestbro" alt="status" title="Best Bro Only"></img>                            
                                <div className="post-buttons">
                                    <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id)}}></img>                            
                                    <img src={postdelete} className="post-delete" alt="status" title="Delete" onClick={() => deleteClick(brospost[i]._id)}></img>                            
                                </div>
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>)

            }else {
                        output.push(
                        <div className="user-post">
                            <div className="post">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <div className="post-buttons">
                                    <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id)}}></img>                            
                                    <img src={postdelete} className="post-delete" alt="status" title="Delete" onClick={() => deleteClick(brospost[i]._id)}></img>                            
                                </div>
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>)
                    }
    
        }
        return (
        <div>
                <div>
                    {showDivs && (
                    <div>
                        <input onChange={handleChange}></input>
                        <button onClick= {editClick}>
                        Done
                        </button>
                    </div>)}
                </div>

            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}