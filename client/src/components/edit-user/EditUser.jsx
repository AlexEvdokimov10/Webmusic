import React , {useEffect , useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import "./edituser.scss"
import {auth , editUser , sendToRestoreEmail} from "../../actions/user";
import MyInput from "../UI/input/MyInput";
import EditAvatar from "./edit-avatar/EditAvatar";
import {Button , message} from "antd";
import {useInput} from "../../hooks/useInput";
import NicknameValidations from "../validations/NicknameValidations";
import EmailValidations from "../validations/EmailValidations";
import {useCallMessage} from "../../hooks/useCallMessage";

const EditUser = () => {
    const dispatch=useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const nickname=useInput(currentUser.nickname,{isEmpty:true,minLength:5})
    const email=useInput(currentUser.email,{isEmpty:true,minLength:5})
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)


    function changeHandler() {
        dispatch ( editUser ( nickname.value  ) )
        dispatch(auth())
    }
    function sendLink() {
        dispatch(sendToRestoreEmail(email.value))
    }

    return (
        <div className="content">
            {contextHolder}
            <div className="div-edit-user">
                <EditAvatar/>
                <MyInput onBlur={ e=>nickname.onBlur(e)} value={nickname.value} onChange={ e=>nickname.onChange(e)} type="text"/>
                <NicknameValidations nickname={nickname}/>
                <Button className="edit-button" onClick={sendLink}>Change Email</Button>
                <Button className="edit-button" onClick={changeHandler}>Edit profile</Button>
            </div>

        </div>
    );
};

export default EditUser;