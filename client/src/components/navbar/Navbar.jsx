import HomeLogo from "../../assets/home-icon.png"
import AvatarLogo from "../../assets/avatar.png"
import LogoutLogo from "../../assets/logout.svg"
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {API_URL} from "../../config";
import Logo from "../../assets/musiclab_logo.svg";
import React , {useEffect} from "react";
import {Avatar} from "antd";
const Navbar=()=>{
    const isAuth = useSelector ( state => state.user.isAuth )
    const dispatch=useDispatch()
    const currentUser=useSelector(state => state.user.currentUser)
    const avatar = API_URL + currentUser.avatar




    return (
        <div className="navbar">
            {isAuth &&<img className="music-logo" width={100}  height={60} src={Logo}/>}
            {isAuth &&<NavLink className="home" to="/home"> <img className="icon" src={HomeLogo} alt=""/><p>Home</p> </NavLink>}
            {!isAuth &&<NavLink to="/login" className="authorization"> Login </NavLink>}
            {!isAuth &&<NavLink to="/registration" className="authorization"> Registration </NavLink>}
            {isAuth && <NavLink to="editUser" className="avatar"> {
                currentUser.avatar ?
                    <Avatar src={avatar} size={52} />
                    :
                    <Avatar size={52}> {currentUser.nickname.charAt(0).toUpperCase()} </Avatar>
            }
                <p className="nickname"> {currentUser.nickname} </p>
            </NavLink>}
            {isAuth &&<p style={{textAlign:"center", fontWeight:"bold"}}>
                <img src={LogoutLogo} className="icon logout" onClick={()=>dispatch(logout())} alt="Logout"/>
                <p>Logout</p> </p>
            }
        </div>
    )
}
export default Navbar;