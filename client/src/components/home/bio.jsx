import {useState} from 'react'
import axios from 'axios'
import "./index.css"

const Bio = () => {

    // Fetch activeUser
    const[activeUsername, Username] = useState("");
    // const[activeBio, Bio] = useState("");
    // const[activeBros, Bros] = useState("");
    // const[activeBestbros, Bestbros] = useState("");

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users/active?email=${localStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        Username(sessionStorage.getItem("username"))
        sessionStorage.setItem("bio", response.data[0].bio);
        // Bio(sessionStorage.getItem("bio"));
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        sessionStorage.getItem("bros");
        sessionStorage.setItem("bestbros", response.data[0].bestbros);
        // Bestbros(sessionStorage.getItem("bestbros"));
    }

    getData()

    const goHome = () =>{
        window.location = "/home"
    }

    // Edit Bio

    const [inputVal, setInputVal] = useState('')

    const editBio = async() => {
        await axios.post(`http://localhost:8080/api/users/editbio`, {username: sessionStorage.getItem("username"), bio:inputVal})
        window.location = '/home'
    };

    return(
        <div className="bio-container">

            <div className="bio-form-container">

                <h1 className='bio-title'>bio.</h1>
                <textarea className='bio-box' placeholder="write your bio." onChange={e => setInputVal(e.target.value)}>
                {sessionStorage.getItem("bio")}
                </textarea>
                <div className='bio-button-container'>
                    <button className='bio-submit' onClick={() => editBio()}>done</button>
                    <button className='bio-skip' onClick={goHome} >skip</button>
                </div>

            </div>
        </div>
    )

}

export default Bio;