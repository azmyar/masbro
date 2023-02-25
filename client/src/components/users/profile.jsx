import {Posts} from './posts'
import { useState } from 'react';
import axios from 'axios'

const brosProfile = () => {

    // Initial Fetch

    const getData=async()=>{
        const response=await axios.get(`http://localhost:8080/api/users/active?email=${localStorage.getItem("email")}`);
        sessionStorage.setItem("username", response.data[0].username);
        sessionStorage.setItem("bio", response.data[0].bio);
        sessionStorage.setItem("bros", JSON.stringify(response.data[0].bros));
        sessionStorage.getItem("bros");
        sessionStorage.setItem("bestbros", response.data[0].bestbros);
    }

    getData()

    const beBro = async(username) => {
        await axios.post(`http://localhost:8080/api/users/bebro`, {username: sessionStorage.getItem("username"), bro:username})
    };

    const beBront = async(username) => {
        await axios.post(`http://localhost:8080/api/users/bebront`, {username: sessionStorage.getItem("username"), bro:username})
    };

    const button = []

    if (sessionStorage.getItem("bros").includes(sessionStorage.getItem("brosusername"))){
        button.push(
            <button onClick={() => beBront(sessionStorage.getItem("brosusername"))}>Be Bron't</button>
        )
    } else {
        button.push(
            <button onClick={() => beBro(sessionStorage.getItem("brosusername"))}>Be Bro</button>
        )
    }


    return(
        <div>
        <h1>{sessionStorage.getItem("brosusername")}</h1>
        <h2>{sessionStorage.getItem("brosbio")}</h2>
        {button}
        {Posts(sessionStorage.getItem("brosusername"))}


        </div>

    )

}

export default brosProfile;