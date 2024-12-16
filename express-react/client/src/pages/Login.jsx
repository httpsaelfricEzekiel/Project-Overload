import {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Layout from "./Layout";

function Login() {
    const [message, setMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => {
            setMessage(data.login)
        })
        .catch((error) => {
            console.log(`Failed to retrieve data from server: ${error}`)
        })
    }, [])

    const loggedIn = async (e) => {
        try {
            e.preventDefault();
            await axios.post('/login', formData)
            .then((res) => {
                if(res.status === 200){
                    setLoginMessage(res.data.message)
                    if(res.data.token){ 
                        localStorage.setItem("jwtToken", res.data.token)
                        navigate("/home")
                    } else if(res.data.error){
                        setErrorMessage(res.data.error)
                    } else {
                        setErrorMessage(res.data.error)
                    }
                } else {
                    navigate("/error")
                }
            })
            .catch((error) => {
                console.log(`Failed to login: ${error}`)
            })
        } catch (error) {
            console.log(`Failed to login: ${error}`)
        }
    }

    return (
        <div>
            <Layout />
            <div>
                <h1>{message}</h1>
            </div>
            <div>
                <form onSubmit={loggedIn}>
                    <input type="text" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/> 
                    <input type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/> 
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                {formData.email.trim() === "" && formData.password.trim() === "" ? (
                    <h1>{errorMessage}</h1>
                ) : (
                    <h1>{errorMessage}</h1>
                )}
            </div>
            <div>
                {typeof loginMessage !== "object" ? (
                    <h1>{loginMessage}</h1>
                ) : (
                    <p>Loading .....</p>
                )}
            </div>
        </div>
    )
}

export default Login;