import './index.css'
import {useState} from 'react'
import axios from 'axios'
import userpict from '../img/user-pict.png'
import edit from '../img/edit.png'
import postdelete from '../img/delete.png'
import bestbro from '../img/bestbro.png'
import './index.css'

const Posts = () => {

    // Get bros post

    const[brospost,Post] = useState("");

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

    
    const output = [];
    
    try{
       
                for (let i = 0; i < brospost.length; i++) {

                    const bestBroValidation = sessionStorage.getItem("bestbroingme").includes(brospost[i].username)

                    if (brospost[i].username === sessionStorage.getItem('username')){
                        
                        if (brospost[i].bestbro){
                            output.push(
                                <div className="user-post">
                            <div className="post">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <img src={bestbro} className="post-bestbro" alt="status" title="Best Bro Only"></img>                            
                                <div className="post-buttons">
                                    <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id, brospost[i].post)}}></img>                            
                                    <img src={postdelete} className="post-delete" alt="status" title="Delete" onClick={() => deleteClick(brospost[i]._id)}></img>                            
                                </div>
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>
                                )

                        }else {
                                    output.push(
                                        <div className="user-post">
                                        <div className="post">
                                            <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                            <p className="post-username">{brospost[i].username}</p>
                                            <p className="post-date">{brospost[i].date}</p>
                                            <div className="post-buttons">
                                                <img src={edit} className="post-edit" alt="status" title="Edit" onClick={() => {showEditPrompt(); saveID(brospost[i]._id, brospost[i].post)}}></img>                            
                                                <img src={postdelete} className="post-delete" alt="status" title="Delete" onClick={() => deleteClick(brospost[i]._id)}></img>                            
                                            </div>
                                        </div>
                                        <p className="post-word">{brospost[i].post}</p>
                                    </div>)
                                }

                    }
                    else if (brospost[i].bestbro && !bestBroValidation){}
                    else{
                            
                            if (brospost[i].bestbro){

                                output.push(
                                    <div className="user-post">
                            <div className="post-users">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                                <img src={bestbro} className="post-bestbro" alt="status" title="Best Bro Only"></img>                            
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>

                                )}else {
                                    output.push(

                                    <div className="user-post">
                            <div className="post-users">
                                <img src={userpict} className="profile-user-picture" alt="status" onClick={() => window.location.replace("/profile")}></img>                            
                                <p className="post-username">{brospost[i].username}</p>
                                <p className="post-date">{brospost[i].date}</p>
                            </div>
                            <p className="post-word">{brospost[i].post}</p>
                        </div>)
                                }
                            }
                                    
                }

        return (
        <div>
                <div>
                    {showDivs && (
                    <div className="bio-container">

                    <div className="bio-form-container">
        
                        <h1 className='bio-title'>edit.</h1>
                        <textarea className='bio-box' defaultValue={sessionStorage.getItem("editPost")} placeholder="write your bio." onChange={e => setInputVal(e.target.value)}>
                        </textarea>
                        <div className='bio-button-container'>
                            <button className='bio-submit' onClick={() => editClick()}>done</button>
                            <button className='bio-skip' onClick={() => showEditPrompt()} >cancel</button>
                        </div>
        
                    </div>
                    </div>
                    )}
                </div>

            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default Posts
