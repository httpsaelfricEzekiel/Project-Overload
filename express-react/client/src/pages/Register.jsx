import React, { useState, useEffect } from "react"
import axios from "axios"

function Register() {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    // const [serverResponse, setServerResponse] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message)
                setTitle(data.title)
                // setServerResponse(data.server)
            })
            .catch((err) => console.log(`Failed to retrieve data in server: ${err}`))
    }, [])

    const registerUser = async (e) => {
        try {
            e.preventDefault();
            await axios.post("/register", formData)
                .then((res) => {
                    if (res.status === 200) {
                        setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: ""
                        })
                        setMessage(res.data.message)
                    }
                })
                .catch((error) => console.log(`Failed to register user ${error}`))
        } catch (err) {
            console.log(`Failed to register user: ${err}`)
        }
    }

    return (
        <div>
            <div>
                <h1>{title}</h1>
                <form onSubmit={registerUser}>
                    <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <button type="submit">Login</button>
                </form>
                {formData.firstName.trim() === "" && formData.lastName.trim() === "" && formData.email.trim() === "" && formData.password.trim() === "" ? (
                    <h1>Fill up the Register Form</h1>
                ) : (
                    <p></p>
                )}
            </div>
            <div>
                {typeof message === "object" ? (
                    <h1>loading ....</h1>
                ) : (
                    <h1>{message}</h1>
                )}
            </div>
        </div>
    )
}

export default Register;