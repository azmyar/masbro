import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../img/logo.png'
import axios from 'axios'
import '../index.css'

function SignUp(){

    const navigate = useNavigate();

    const [error, setError] = useState(""); 

    const [data, setData] = useState ({
        username: '',
        email: '',
        password: '',
        bio: '',
        bros: [],
        bestbros: [],
        bestbroingme: []
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "http://localhost:8080/api/users"
            await axios.post(url,data);
            navigate("/login")
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
            <p className="greeting">welcome, bro.</p>
        )
    }

    return (
        <div className="main-container">
        
            <div className="div-login">

                <form className="form" onSubmit={handleSubmit}>
                    <img src={logo} className="auth-logo" alt="logo"></img>
                    {message}


                    <input
                        type="text" 
                        placeholder="Username" 
                        className="inputs" 
                        name="username"
                        onChange = {handleChange}
                        value={data.username}
                        required
                    />

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

                    <button type="submit" className="submit" >Sign Up</button>

                    <p className="signup">Already have an account? <Link to='/login' className="link">Log In</Link></p>
                </form>
            </div>

        </div>
      )
}

export default SignUp