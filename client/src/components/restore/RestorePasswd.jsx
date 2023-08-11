import React from 'react';
import MyInput from "../UI/input/MyInput";
import {useInput} from "../../hooks/useInput";
import styles from "./restore.module.css";
import {Button , message} from "antd";
import PasswordValidations from "../validations/PasswordValidations";
import ErrorDiv from "../UI/errors/ErrorDiv";
import {useParams} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {changePasswd} from "../../actions/user";
import {useCallMessage} from "../../hooks/useCallMessage";

const RestorePasswd = () => {
    const password=useInput('',{isEmpty:true,minLength:5})
    const confirmPassword=useInput('',{isEmpty:true,minLength:5})
    const dispatch = useDispatch()
    const params = useParams()
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)
    const checkInvalid = () => {
        return !confirmPassword.inputIsValid || !password.inputIsValid || !(confirmPassword.value === password.value)
    }

    const restorePassword = () => {
        dispatch(changePasswd(params.id,password.value))
        password.setValue("")
        confirmPassword.setValue("")
    }
    return (
        <div className={styles.restore__div}>
            {contextHolder}
            Restore Password
            <MyInput className={styles.restore__input} onBlur={ e=>password.onBlur(e)} value={password.value} onChange={ e=>password.onChange(e)} name="password" type="password" placeholder="MyInput password..."/>
            <PasswordValidations password={password}/>
            <MyInput className={styles.restore__input}  onBlur={ e=>confirmPassword.onBlur(e)} value={confirmPassword.value} onChange={ e=>confirmPassword.onChange(e)} name="password" type="password" placeholder="Confirm password..."/>
            { !(confirmPassword.value === password.value) && <ErrorDiv> Passwords don't match  </ErrorDiv>}
            <Button disabled={checkInvalid()} className={styles.restore__button} onClick={()=>{restorePassword()}}>Change password</Button>
        </div>
    );
};

export default RestorePasswd;