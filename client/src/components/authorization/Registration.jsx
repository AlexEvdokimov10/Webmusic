import React , {useEffect , useState} from 'react';
import './authorization.scss'
import Logo from "../../assets/musiclab_logo.svg"
import MyInput from "../UI/input/MyInput";
import {registration} from "../../actions/user";
import {Button , Form , message} from "antd";
import {useInput} from "../../hooks/useInput";
import NicknameValidations from "../validations/NicknameValidations";
import EmailValidations from "../validations/EmailValidations";
import PasswordValidations from "../validations/PasswordValidations";
import {useDispatch , useSelector} from "react-redux";
import {getError , getSuccess} from "../../reducers/errorReducer";
import {useCallMessage} from "../../hooks/useCallMessage";

const Registration = () => {
    const nickname=useInput('',{isEmpty:true,minLength:3,maxLength:12})
    const email=useInput('',{isEmpty:true,minLength:5})
    const password=useInput('',{isEmpty:true,minLength:5})
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const register = () =>{
        dispatch(registration(nickname.value,email.value,password.value))

    }
    useCallMessage(errorMessage,successMessage,messageApi,dispatch)
    const checkInvalid = () => {
      return !email.inputIsValid ||
          !password.inputIsValid ||
          !nickname.inputIsValid
    }

    return (
        <Form className="authorization" onFinish={register}>
            {contextHolder}
            <img width={100}  height={60} src={Logo}/>
            <div className="auth-header">Registration</div>
            <MyInput onBlur={ e=>nickname.onBlur(e)} value={nickname.value} onChange={ e=>nickname.onChange(e)} type="text" placeholder="MyInput nickname..." />
            <NicknameValidations nickname={nickname}/>
            <MyInput onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" placeholder="MyInput email..." />
            <EmailValidations email={email}/>
            <MyInput onBlur={ e=>password.onBlur(e)} value={password.value} onChange={ e=>password.onChange(e)} name="password" type="password" placeholder="MyInput password..."/>
            <PasswordValidations password={password}/>
            <Button disabled={checkInvalid()} className="auth-button" htmlType="submit">Register</Button>
        </Form>
    );
};

export default Registration;