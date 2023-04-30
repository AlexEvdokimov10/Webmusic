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
            {isAuth &&
                <div className="navbar">
                    <img className="music-logo" width={100}  height={60} src={Logo}/>
                    <NavLink className="home" to="/home"> <img className="icon" src={HomeLogo} alt=""/><p>Home</p> </NavLink>
                    <NavLink to="editUser" style={{marginLeft:10,textDecoration:"none"}}> {
                        currentUser.avatar ?
                            <Avatar className="avatar" src={avatar} size={52} />
                            :
                            <Avatar size={52}> {currentUser.nickname.charAt(0).toUpperCase()} </Avatar>
                    }
                        <p className="nickname"> {currentUser.nickname} </p>
                    </NavLink>
                    <p style={{textAlign:"center", fontWeight:"bold",marginLeft:10}}>
                        <img src={LogoutLogo} className="icon logout" onClick={()=>dispatch(logout())} alt="Logout"/>
                        <p>Logout</p> </p>
                </div>}
            {!isAuth &&<NavLink to="/login" className="authorization"> Login </NavLink>}
            {!isAuth &&<NavLink to="/registration" className="authorization"> Registration </NavLink>}
        </div>
    )
}
export default Navbar;