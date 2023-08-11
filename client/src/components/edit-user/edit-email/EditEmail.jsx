import React , {useEffect} from 'react';
import EmailValidations from "../../validations/EmailValidations";
import {useDispatch , useSelector} from "react-redux";
import {useInput} from "../../../hooks/useInput";
import MyInput from "../../UI/input/MyInput";
import {Button , message} from "antd";
import {changeEmail , sendToRestoreEmail , sendToRestorePasswd} from "../../../actions/user";
import styles from  "./editEmail.module.css"
import {useParams} from "react-router-dom";
import {useCallMessage} from "../../../hooks/useCallMessage";


const EditEmail = () => {
    const dispatch=useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const email=useInput(currentUser.email,{isEmpty:true,minLength:5})
    const params = useParams()
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)


    function changeProfileEmail(){
        console.log(params.id)
        dispatch(changeEmail(params.id,email.value))
    }

    return (
        <div className={styles.change__div}>
            {contextHolder}
            Edit email
            <MyInput onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" />
            <EmailValidations email={email}/>
            <Button className="edit-button" style={{marginLeft:400}} onClick={()=>{changeProfileEmail()}}> Send link </Button>
        </div>
    );
};

export default EditEmail;