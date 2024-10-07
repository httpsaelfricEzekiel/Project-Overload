import React from 'react';
import Container from './components/Container';
import Form from './components/Form';
import InputEmail from './components/Input';
import InputPassword from './components/InputPassword';
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
                        <div className='input-box1'>
                            <InputEmail type="email" placeholder="Enter Email"/>
                        </div>
                        <div className='input-box2'>
                            <InputPassword type="password" placeholder="Enter Password"/>
                        </div>
                        <div className='btn-box'>

                        </div>
                    </Form>
                </LoginContainer>
            </Container>
        </Universal>
    )
}

export default Main;