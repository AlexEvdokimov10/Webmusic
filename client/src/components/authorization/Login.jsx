import React , {useEffect , useState} from 'react';
import Logo from "../../assets/musiclab_logo.svg";
import MyInput from "../UI/input/MyInput";
import {auth , login} from "../../actions/user";
import {NavLink , useLocation , useNavigate} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {Button , Form , message} from "antd";
import {useInput} from "../../hooks/useInput";
import EmailValidations from "../validations/EmailValidations";
import PasswordValidations from "../validations/PasswordValidations";
import {useCheckAuth} from "../../hooks/useCheckAuth";

const Login = () => {
    const email=useInput('',{isEmpty:true,minLength:5})
    const password=useInput('',{isEmpty:true,minLength:5})
    const errorMessage = useSelector(state =>state.message.error)
    const successMessage = useSelector(state =>state.message.successMessage)
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch ()




    const loginUser =  () => {
        dispatch ( login ( email.value , password.value ) )
    }


    useCheckAuth(errorMessage,successMessage,messageApi,dispatch)

    const checkInvalid = () => {
        return !email.inputIsValid || !password.inputIsValid
    }

    return (

            <Form className="authorization" onFinish={loginUser}>
                {contextHolder}
                <img width={ 100 } height={ 60 } src={ Logo }/>
                <div className="auth-header">Login</div>
                <MyInput onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" placeholder="MyInput email..." />
                <EmailValidations email={email}/>
                <MyInput onBlur={ e=>password.onBlur(e)} value={password.value} onChange={ e=>password.onChange(e)} name="password" type="password" placeholder="MyInput password..."/>
                <PasswordValidations password={password}/>
                <Button disabled={checkInvalid()} className="auth-button"  htmlType="submit">Login</Button>
            </Form>
    );
};
export default Login;