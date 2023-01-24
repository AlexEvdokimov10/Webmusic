import HomeLogo from "../../assets/home-icon.png"
import './navbar.scss'
import {NavLink} from "react-router-dom";
const Navbar=()=>{
    return (
        <div className="navbar">
            <NavLink className="home nav-text" to="/"> <img className="icon" src={HomeLogo} alt=""/> </NavLink>
            <div className="navbar_header"></div>
            <NavLink to="/login"> Login </NavLink>
            <NavLink to="/registration"> Registration </NavLink>
        </div>
    )
}
export default Navbar;