import { Link, Outlet} from "react-router-dom";
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
                <Link to="/register" style={{textDecoration: 'none'}}>Register Here</Link>
            </div>
            <Outlet/>
        </NavbarRegister>
    )
}