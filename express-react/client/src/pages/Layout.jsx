import { Link, Outlet} from "react-router-dom";
import styled from "styled-components";

const NavbarRegister = styled.nav`
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 0;
    right: 2rem;
    border: 1px solid red;
    z-index: 1;
`

export default function LoginLink(){
    return (
        <nav>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <Outlet />
        </nav>
    )
}

export function RegisterLink(){
    return (
        <NavbarRegister>
            <div>
                <Link to="/register" style={{textDecoration: 'none'}}>Register</Link>
            </div>
            <Outlet/>
        </NavbarRegister>
    )
}