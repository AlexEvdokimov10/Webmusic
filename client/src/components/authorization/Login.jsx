import React, {useState} from 'react';
import Logo from "../../assets/musiclab_logo.svg";
import Input from "../../utils/input/Input";
import {login} from "../../actions/user";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()
    return (
        <div className="authorization">
            <img width={100}  height={60} src={Logo}/>
            <div className="auth-header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Input email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password..."/>
            <button className="auth-button" onClick={() => dispatch(login(email,password))}>Login</button>
            <span className="continue"> <NavLink to="../body" > Lets listen music </NavLink> </span>
        </div>
    );
};
export default Login;