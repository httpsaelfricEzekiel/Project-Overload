import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { RegisterLink } from "./Layout";
import styled from 'styled-components'
import '../App.css'
import image from '../images/bg-clinic3.jpg'

const Title = styled.h1`
    color: ${props => props.color ? props.color : '#651fff'};
    font-size: 1.2rem;
    font-family: 'Verdana', 'Arial', 'san-serif';
    margin: 0;
`
const ButtonLogin = styled.button`
    background-color: #3d5afe;
    color: white;
    font-size: 1rem;
    width: 20rem;
    height: 3rem;
    border-radius: 2rem;
    border: #bdbdbd
`

const Button = ({ children, type }) => {
    return (
        <ButtonLogin type={type}>
            {children}
        </ButtonLogin>
    )
}

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
        const homePage = () => {
            try {
                fetch("/api")
                    .then((res) => res.json())
                    .then((data) => {
                        setMessage(data.login)
                    })
                    .catch((error) => {
                        console.log(`Failed to retrieve data from server: ${error}`)
                    })
            } catch (error) {
                console.log(`Failed to retrieve data from server: ${error}`)
            }
        }
        homePage()
    }, [])

    const loggedIn = async (e) => {
        try {
            e.preventDefault();
            await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setLoginMessage(res.data.message)
                        if (res.data.token && res.data.session) {
                            localStorage.setItem("firstName", res.data.session.firstName)
                            localStorage.setItem("lastName", res.data.session.lastName)
                            navigate("/home")
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
        <div className="login-container">
            <div className="login-box">
                <RegisterLink />
                <div className="side-box-form">
                    <div className="login-title">
                        <Title color="#039be5">{message}</Title>
                    </div>
                    <div className="login-box-form">
                        <form onSubmit={loggedIn} className="form-box">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    id="email"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={formData.password} 
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    id="password"
                                />
                            </div>
                            <div className="button-form-group">
                                <Button type="submit" id="login">Login</Button>
                            </div>
                        </form>
                    </div>
                    <div className="register-account-container">
                        <p>Don't you have an account?</p>
                    </div>
                </div>
                <div className="login-account-img-container">
                    <img src={image} id="clinic-img" alt="clinic"/>
                </div>
                <div className="error-message">
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
        </div>
    )
}

export default Login;