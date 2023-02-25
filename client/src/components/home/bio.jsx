import {useState} from 'react'
import axios from 'axios'


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
        <div>
        <h1>add your bio.</h1>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)}></input>
        <button onClick={() => editBio()} disabled={!inputVal}>Done</button>
        <button onClick={goHome} >skip for now</button>
        </div>
    )

}

export default Bio;