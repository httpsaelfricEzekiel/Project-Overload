import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Container from './components/Container';
import Form from './components/Form';
import InputEmail from './components/Input';
import InputPassword from './components/InputPassword';
import LoginContainer from './components/LoginBox';
import Universal from './components/Universal';
import './style.css';

const Main = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        email: ' ',
        password: ' '
    })
    const [loggedIn, setLoggedIn] = useState(true);
    const [message, setMessage] = useState("");

    const users = [formData.email];
    const users_password = [formData.password];

    useEffect(() => {
        const url = "http://localhost:4000";
        fetch(url)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((error) => console.log(error));
    }, [])
    
    const insertChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

    }
    const insertStudent = async (e) => {
        e.preventDefault();

        const url = "http://localhost:4000/insert";
        
        const data = new FormData();

        try {
            const response = await axios.post(url, formData);
            console.log(response.data);
            if(response) {
                if(users.includes(data.append("email", formData.email)) && users_password.includes(data.append("password", formData.password))){
                    alert("student inserted");
                    setFormData({
                        email: '',
                        password: ''
                    });
                    setLoggedIn(true);
                } else {
                    alert("Invalid");
                }
            } else {    
                alert("error in post request");
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <Universal>
            <Container>
                {loggedIn ? (
                    <LoginContainer id='login-container'>
                        <h1 className="l-h">Login</h1>  
                        <Form onInsert={insertStudent}>
                            <div className='input-box1'>
                                <InputEmail type="email" placeholder="Enter Email" value={formData.email} onChange={insertChange} name="email" required/>
                            </div>
                            <div className='input-box2'>
                                <InputPassword type="password" placeholder="Enter Password" value={formData.password} onChange={insertChange} name="password" required />
                            </div>
                            <div className='btn-box'>
                                <Button/>
                            </div>
                        </Form>
                    </LoginContainer>
                    ) : (
                        <div>
                            <h1>No Accounts LoggedIn</h1>
                            <h1>{message}</h1>
                        </div>
                    )
                }
            </Container>
        </Universal>
    )
}

export default Main;