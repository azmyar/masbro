import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../logo.png'
import axios from 'axios'
import './index.css'

function SignUp(){

    const [data, setData] = useState ({
        username: '',
        email: '',
        password: '',
        bio: '',
        bros: [],
        superbros: []
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "http://localhost:8080/api/users"
            const {data: res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message)
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
            
            <div className="div-illustration">
            </div>

            <div className="div-login">

                <Link to='/login'>
                    <button className="login" >Log In</button>
                </Link>

                <form className="form" onSubmit={handleSubmit}>
                    <img src={logo} className="logo" alt="logo"></img>
                    <p className="greeting">fill to sign up</p>

                    <input
                        type="text" 
                        placeholder="Username" 
                        className="input" 
                        name="username"
                        onChange = {handleChange}
                        value={data.username}
                        required
                    />

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

                    <button type="submit" className="login" >Sign Up</button>

                    <p>don't have an account? Sign Up</p>
                </form>
            </div>

        </div>
      )
}

export default SignUp