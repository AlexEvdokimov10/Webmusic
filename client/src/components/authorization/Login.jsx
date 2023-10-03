import React , {useEffect , useState} from 'react';
import Logo from "../../assets/musiclab_logo.svg";
import MyInput from "../UI/input/MyInput";
import styles from "./authorization.module.css"
import {auth , login} from "../../actions/user";
import {NavLink , useLocation , useNavigate} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {Button , Form , message} from "antd";
import {useInput} from "../../hooks/useInput";
import EmailValidations from "../validations/EmailValidations";
import PasswordValidations from "../validations/PasswordValidations";
import {useCallMessage} from "../../hooks/useCallMessage";
import InputPassword from "../UI/input/InputPassword";

const Login = () => {
    const email=useInput('',{isEmpty:true,minLength:5})
    const password=useInput('',{isEmpty:true,minLength:5})
    const [showPassword,setShowPassword] = useState(false)
    const errorMessage = useSelector(state =>state.error.error)
    const successMessage = useSelector(state =>state.error.successMessage)
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const dispatch = useDispatch ()

    const loginUser =  () => {
        dispatch ( login ( email.value , password.value,navigate ) )
    }
    

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)

    const checkInvalid = () => {
        return !email.inputIsValid || !password.inputIsValid
    }

    return (

            <Form className={styles.authorization__form} onFinish={loginUser}>
                {contextHolder}
                <img width={ 100 } height={ 60 } src={ Logo }/>
                <div className={styles.auth__header}>Login</div>
                <MyInput  onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" placeholder="Enter email..." />
                <EmailValidations email={email}/>
                <InputPassword onBlur={ e=>password.onBlur(e)} value={password.value} onChange={ e=>password.onChange(e)} name="password" type={showPassword ? "text":"password"} placeholder="Enter password..."/>
                <PasswordValidations password={password}/>
                <NavLink to={"/restore"}>If you forget password</NavLink>
                <Button disabled={checkInvalid()} className="auth-button"  htmlType="submit">Login</Button>
            </Form>
    );
};
export default Login;