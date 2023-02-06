import HomeLogo from "../../assets/home-icon.png"
import AvatarLogo from "../../assets/avatar.png"
import LogoutLogo from "../../assets/logout.svg"
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {API_URL} from "../../config";
import Logo from "../../assets/musiclab_logo.svg";
import React from "react";
const Navbar=()=>{
    const isAuth = useSelector ( state => state.user.isAuth )
    const dispatch=useDispatch()
    const currentUser=useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : AvatarLogo


    return (
        <div className="navbar">
            {isAuth &&<img className="music-logo" width={100}  height={60} src={Logo}/>}
            {isAuth &&<NavLink className="home" to="/"> <img className="icon" src={HomeLogo} alt=""/><p>Home</p> </NavLink>}
            {!isAuth &&<NavLink to="/login" className="authorization"> Login </NavLink>}
            {!isAuth &&<NavLink to="/registration" className="authorization"> Registration </NavLink>}
            {isAuth && <NavLink to="/editUser" className="avatar"> <img className="icon icon-avatar" src={avatar} alt=""/>
                <p className="nickname"> {currentUser.nickname} </p>
            </NavLink>}
            {isAuth &&<img src={LogoutLogo} className="icon logout" onClick={()=>dispatch(logout())} alt="Logout"/>}
        </div>
    )
}
export default Navbar;