import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import logo from '../../logo.png'
import './index.css'

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
            window.location = "/home"
        }catch(error){
            if (error.response &&
                error.response.status >= 400 && 
                error.response.status <= 500
                ){
                    setError(error.response.data.message)
                }
        }
    }

    return (
        <div className="container">
        
            <div className="div-login">

                <form className="form" onSubmit={handleSubmit}>
                    <img src={logo} className="logo" alt="logo"></img>
                    <p className="greeting">welcome, bro.</p>
                
                    <input
                        type="email" 
                        placeholder="Email" 
                        className="input" 
                        name="email"
                        onChange = {handleChange}
                        value={data.email}
                        required
                    />

                    <input
                        type="password" 
                        placeholder="Password" 
                        className="input" 
                        name="password"
                        onChange = {handleChange}
                        value={data.password}
                        required
                    />

                    {error && <div>{error}</div>}

                    <button type="submit" className="login" >Login</button>
        
                    <p className="signup">Don't have an account? <Link to='/signup' className="link">Sign Up</Link></p>
                </form>
            </div>

            <div className="div-illustration">
            </div>

        </div>
      )
}

export default Login
