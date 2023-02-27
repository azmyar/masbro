import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import logo from '../../img/logo.png'
import '../index.css'

function Login(){

    const [error, setError] = useState("");

    const [data, setData] = useState ({
        email: "",
        password: "" 
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "http://localhost:8080/api/auth"
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data)
            localStorage.setItem("email", data.email);

            const askBio = await axios.get(`http://localhost:8080/api/users/active?email=${data.email}`)
            if (askBio.data[0].bio === ""){
                window.location = "/bio"
            } else {
            window.location = "/home"
        }
        }catch(error){
            if (error.response &&
                error.response.status >= 400 && 
                error.response.status <= 500
                ){
                    setError(error.response.data.message)
                }
        }
    }

    const message = []

    if (error) {
        message.push(<div class="talk-bubble tri-right round btm-left">
        <div class="talktext">
            <p>{error}, bro.</p>
        </div>
        </div>)
    } else {
        message.push(
            <p className="greeting">hello, bro.</p>
        )
    }

    return (
        <div>
        <div className='main-container'>

            <div>

                <form className="form" onSubmit={handleSubmit}>
                    
                    <img src={logo} className="auth-logo" alt="logo"></img>
                    {message}

                    <input
                        type="email" 
                        placeholder="Email" 
                        className="inputs" 
                        name="email"
                        onChange = {handleChange}
                        value={data.email}
                        required
                    />

                    <input
                        type="password" 
                        placeholder="Password" 
                        className="inputs" 
                        name="password"
                        onChange = {handleChange}
                        value={data.password}
                        required
                    />


                    <button type="submit" className="submit" >Login</button>
        
                    <p className="signup">Don't have an account? <Link to='/signup' className="link">Sign Up</Link></p>
                </form>

            </div>
        </div>
        </div>
      )
}

export default Login
