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

    
    // Edit Post
    const [post, setInputVal] = useState("")

    const [showDivs, setShowDivs] = useState(false);
    const showEditPrompt = () => {
        setShowDivs(!showDivs);
    }

    const saveID = async(id, post) => {
        sessionStorage.setItem('editID', id)
        sessionStorage.setItem('editPost', post)
    }

    const editClick = async() => {
        await axios.post(`http://localhost:8080/api/post/edit`, {_id:sessionStorage.getItem('editID'),post})
        setInputVal("")
        sessionStorage.removeItem('editID')
        showEditPrompt()
    };

    // Delete Post
    const deleteClick = async(id) => {
        await axios.post(`http://localhost:8080/api/post/delete`, {_id:id})
    };


    // Return
    const output = []
    const message = []

    try{
        for (let i = 0; i < brospost.length; i++) {

            if (brospost[i].bestbro){
                output.push(
                        <div className="user-post">
                            <div className="post">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <img src={bestbro} className="post-bestbro" alt="status" title="For Best Bro Only"></img>                            
                                <div className="post-buttons">
                                    <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id,brospost[i].post)}}></img>                            
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
                                    <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id,brospost[i].post)}}></img>                            
                                    <img src={postdelete} className="post-delete" alt="status" title="Delete" onClick={() => deleteClick(brospost[i]._id)}></img>                            
                                </div>
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>)
                    }
    
        }
        if (output.length === 0){
            message.push (<div className="home-message">no posts yet.</div>)
        } else {
            message.push ('')
        }
        return (
        <div>
                <div>
                    {showDivs && (
                    <div className="bio-container">

                    <div className="bio-form-container">
        
                        <h1 className='bio-title'>edit.</h1>
                        <textarea className='bio-box' defaultValue={sessionStorage.getItem("editPost")} onChange={e => setInputVal(e.target.value)}>
                        </textarea>
                        <div className='bio-button-container'>
                            <button className='bio-submit' onClick={() => editClick()}>done</button>
                            <button className='bio-skip' onClick={() => showEditPrompt()} >cancel</button>
                        </div>
        
                    </div>
                    </div>
                    )}
                </div>
                <hr/>

            {message}
            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}