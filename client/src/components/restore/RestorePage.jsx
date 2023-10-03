import React from 'react';
import MyInput from "../UI/input/MyInput";
import EmailValidations from "../validations/EmailValidations";
import {useInput} from "../../hooks/useInput";
import {Button , message} from "antd";
import styles from "./restore.module.css"
import restorePasswd from "./RestorePasswd";
import {useDispatch , useSelector} from "react-redux";
import {sendToRestorePasswd} from "../../actions/user";
import {useCallMessage} from "../../hooks/useCallMessage";

const RestorePage = () => {
    const email=useInput("",{isEmpty:true,minLength:5})
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)
    function send(){
        dispatch(sendToRestorePasswd(email.value))
    }
    return (
        <div className={styles.restore}>
            {contextHolder}
            INPUT YOUR EMAIL
            <MyInput className={styles.restore__input} onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" />
            <EmailValidations email={email}/>
            <Button className={styles.restore__button} onClick={()=>send()}>Send link on email</Button>
        </div>
    );
};

export default RestorePage;