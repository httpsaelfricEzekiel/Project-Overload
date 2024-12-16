import { Link, Outlet} from "react-router-dom";

export default function Layout(){
    return (
        <nav>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <Outlet />
        </nav>
    )
}