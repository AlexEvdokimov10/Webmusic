import React, {useState} from 'react';
import './registration.scss'
import Logo from "../../assets/musiclab_logo.svg"
import {NavLink} from "react-router-dom";
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [nickname,setNickname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div className="authorization">
            <img width={100}  height={60} src={Logo}/>
            <div className="auth-header">Registration</div>
            <Input value={nickname} setValue={setNickname} type="text" placeholder="Input nickname..." />
            <Input value={email} setValue={setEmail} type="text" placeholder="Input email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Input password..."/>
            <button className="auth-button" onClick={()=>registration(nickname,email,password)} >Register</button>
            <span className="continue"> <NavLink to="../body" > Lets listen music </NavLink> </span>
        </div>
    );
};

export default Registration;