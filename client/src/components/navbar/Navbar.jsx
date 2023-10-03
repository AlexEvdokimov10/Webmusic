import HomeLogo from "../../assets/home-icon.png"
import AvatarLogo from "../../assets/avatar.png"
import LogoutLogo from "../../assets/logout.svg"
import AdminLogo from "../../assets/icon-admin.png"
import RecommendLogo from "../../assets/search_music.png"
import AlbumsLogo from "../../assets/AlbumsLogo.png"
import './navbar.scss'
import {NavLink , useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {API_URL} from "../../config";
import Logo from "../../assets/musiclab_logo.svg";
import React, {useEffect} from "react";
import {Avatar} from "antd";
import {PhoneOutlined, PlusCircleOutlined} from "@ant-design/icons";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const isSupport = useSelector(state => state.user.isSupport)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = API_URL + currentUser.avatar
    const navigate = useNavigate()

    return (
        <div className="header">
            {isAuth &&
                <div className="header">
                    <img className="header__logo" width={100} height={60} src={Logo}/>
                    <span className="header__menu">
                    {isAdmin &&
                        <span style={{textAlign: "center"}}>
                            <NavLink className="header__navMenuItem" to="/panel"> <img className="header__icon" src={AdminLogo}/>
                                <p> Admin Panel </p>
                            </NavLink>
                            </span>
                    }
                        {isSupport &&
                        <NavLink className="header__navMenuItem" to="/chat">
                            <PhoneOutlined style={{fontSize: 45}} className="header__icon"/>
                        <p> Send responses </p>
                    </NavLink>
                        }
                        <NavLink className="header__navMenuItem" to="/upload">
                            <PlusCircleOutlined style={{fontSize: 45}} className="header__icon"/>
                            <p>Upload Music</p>
                        </NavLink>
                        <NavLink className="header__navMenuItem" to="/albums">
                        <img className="header__icon" src={AlbumsLogo} alt=""/>
                        <p> Albums </p>
                    </NavLink>
                    <NavLink className="header__navMenuItem" to="/recommends">
                        <img className="header__icon" src={RecommendLogo} alt=""/>
                        <p> Recommend </p>
                    </NavLink>

                    <NavLink className="header__navMenuItem" to="/home"> <img className="header__icon" src={HomeLogo} alt=""/>
                        <p> Home </p>
                    </NavLink>

                    <NavLink to="editUser" className="header__editUser"> {
                        currentUser.avatar ?
                            <Avatar className="header__avatar" src={avatar} size={52}/>
                            :
                            <Avatar className="header__avatar" size={52}> {currentUser.nickname.charAt(0).toUpperCase()} </Avatar>
                    }
                        <p className="header__nickname"> {currentUser.nickname} </p>
                    </NavLink>
                    <p style={{textAlign: "center", fontWeight: "bold", marginLeft: 10}}>
                        <img src={LogoutLogo} className="header__icon" onClick={() => {
                            dispatch(logout())
                            navigate("/login")
                        }} alt="Logout"/>
                        <p>Logout</p>
                    </p>
                        </span>
                </div>}
            {!isAuth && <NavLink to="/login" className="header__authorization"> Login </NavLink>}
            {!isAuth && <NavLink to="/registration" className="header__authorization"> Registration </NavLink>}
        </div>
    )
}
export default Navbar;