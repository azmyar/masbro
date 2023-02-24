import Posts from './posts'

const Profile = () => {

    return(
        <div>
        <h1>{sessionStorage.getItem("username")}</h1>
        <h2>{sessionStorage.getItem("bio")}</h2>
        <h3>{sessionStorage.getItem("bros")}</h3>
        <Posts/>
        </div>
    )


}

export default Profile;