import {useState, useEffect} from "react"
import axios from "axios"

function Login() {
    const [message, setMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

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
                    if(formData.email.trim() !== "" && formData.password.trim() !== ""){
                        setFormData({
                            email: "",
                            password: ""
                        })
                        setLoginMessage(res.data.message)
                    } else {
                        setErrorMessage(res.data.error)
                    }
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
            <div>
                <h1>{message}</h1>
            </div>
            <div>
                <form onSubmit={loggedIn}>
                    <input type="email" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/> 
                    <input type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/> 
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                {formData.email.trim() === "" && formData.password.trim() === "" ? (
                    <h1>Fill up the required fields!</h1>
                ) : (
                    <p></p>
                )}
            </div>
            <div>
                {typeof errorMessage === "object" ? (
                    <p></p>
                ) : (
                    <h1>{errorMessage}</h1>
                )}
            </div>
            <div>
                {typeof loginMessage === "object" ? (
                    <p></p>
                ) : (
                    <h1>{loginMessage}</h1>
                )}
            </div>
        </div>
    )
}

export default Login;