import './index.css'
import {useState} from 'react'
import axios from 'axios'

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

    // Handle Change for Edit Post

    const [post, setPost] = useState ({})

    const handleChange = ({currentTarget: input}) => {
        setPost(input.value)
    }


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

    
    const output = [];
    
    try{
        for (let i = 0; i < brospost.length; i++) {


            if (brospost[i].username === sessionStorage.getItem('username')){
                output.push(
                    <div className="login">
                            {brospost[i].post}
                            {brospost[i].date}
                            {brospost[i].username}
                            <button onClick={() => deleteClick(brospost[i]._id)}>
                            Delete
                            </button>
                            <button onClick={() => {showEditPrompt(); saveID(brospost[i]._id)}}>
                            Edit
                            </button>
                    </div>
                    )
                }else{
                    output.push(
                        <div className="login">
                                {brospost[i].post}
                                {brospost[i].date}
                                {brospost[i].username}
                        </div>
                    )
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

export default Posts
