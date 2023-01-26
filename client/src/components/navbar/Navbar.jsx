import HomeLogo from "../../assets/home-icon.png"
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
const Navbar=()=>{
    const isAuth = useSelector ( state => state.user.isAuth )
    const dispatch=useDispatch()
    return (
        <div className="navbar">
            {isAuth &&<NavLink className="home nav-text" to="/"> <img className="icon" src={HomeLogo} alt=""/> </NavLink>}
            {!isAuth &&<NavLink to="/login"> Login </NavLink>}
            {!isAuth &&<NavLink to="/registration"> Registration </NavLink>}
            {isAuth &&<div className="logout" onClick={()=>dispatch(logout())}> Logout </div>}
        </div>
    )
}
export default Navbar;