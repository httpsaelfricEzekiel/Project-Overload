import React from 'react';
import Container from './components/Container';
import Form from './components/Form';
import InputEmail from './components/Input';
import LoginContainer from './components/LoginBox';
import Universal from './components/Universal';
import './style.css';
const Main = () => {

    return (
        <Universal>
            <Container>
                <LoginContainer>
                    <h1 className="l-h">Login</h1>  
                    <Form>
                        <InputEmail type="email" placeholder="Enter Email"/>
                    </Form>
                </LoginContainer>
            </Container>
        </Universal>
    )
}

export default Main;