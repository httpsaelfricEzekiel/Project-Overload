import React, { useState, useEffect } from "react"
import axios from "axios"
import LoginLink from "./Layout";
import { useNavigate } from "react-router-dom";

function Register() {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message)
                setTitle(data.title)
            })
            .catch((err) => console.log(`Failed to retrieve data in server: ${err}`))
    }, [])

    const registerUser = async (e) => {
        try {
            e.preventDefault();
            await axios.post("/register", formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        if (formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.dateOfBirth !== "" && formData.password !== "") {
                            setFormData({
                                firstName: "",
                                lastName: "",
                                email: "",
                                dateOfBirth: "",
                                password: ""
                            })
                            navigate("/register")
                        }
                        setMessage(res.data.message)
                    } else {
                        navigate("/error")
                    }
                })
                .catch((error) => console.log(`Failed to register user ${error}`))
        } catch (err) {
            console.log(`Failed to register user: ${err}`)
        }
    }

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-form-field">
                    <LoginLink />
                    <div className="register-title">
                        <h1 className="title-content">{title}</h1>
                    </div>
                    <div className="register-form-box">
                        <form onSubmit={registerUser} className="register-input">
                            <div className="register-form-group">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    id="firstName"
                                />
                            </div>
                            <div className="register-form-group">
                                <input
                                    type="text"
                                    placeholder="Last Name" 
                                    value={formData.lastName} 
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                                    id="lastName"
                                />
                            </div>
                            <div className="register-form-group">
                                <input 
                                    type="text" 
                                    placeholder="Email" 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                    id="email"
                                />
                            </div>
                            <div className="register-form-group">
                                <input 
                                    type="date" 
                                    placeholder="Date of Birth" 
                                    value={formData.dateOfBirth} 
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} 
                                    id="date-of-birth"
                                />
                            </div>
                            <div className="register-form-group">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={formData.password} 
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                                    id="password"
                                />
                            </div>
                            <div className="register-button-form">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                    {formData.firstName.trim() === "" && formData.lastName.trim() === "" && formData.email.trim() === "" && formData.dateOfBirth.trim() === "" && formData.password.trim() === "" ? (
                        <h1>{message}</h1>
                    ) : (
                        <h1>{message}</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Register;