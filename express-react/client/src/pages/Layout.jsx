import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarRegister = styled.nav`
    width: 8rem;
    height: 2rem;
    position: absolute;
    bottom: 6.50rem;
    ${'' /* border: 1px solid red; */}
    right: 5rem;
    z-index: 1;
    text-align: center;
`

const NavbarLogin = styled.nav`
    border-radius: 1rem;
    position: absolute;
    right: 0;
    bottom: 1rem;
    border: 1px solid red;
    display: block;
`

export default function LoginLink(){
    return (
        <NavbarLogin>
            <div className="login-link">
                <Link to="/login" style={{textDecoration: 'none', color: 'black', fontSize: '1rem'}}>Login</Link>
            </div>
        </NavbarLogin>
    )
}

export function RegisterLink(){
    return (
        <NavbarRegister>
            <div>
                <Link to="/register" style={{textDecoration: 'none'}}>Register</Link>
            </div>
        </NavbarRegister>
    )
}