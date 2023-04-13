import React , {useEffect , useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import "./edituser.scss"
import {auth , editUser} from "../../actions/user";
import MyInput from "../UI/input/MyInput";
import EditAvatar from "./edit-avatar/EditAvatar";
import {Button} from "antd";
import {useInput} from "../../hooks/useInput";
import NicknameValidations from "../validations/NicknameValidations";
import EmailValidations from "../validations/EmailValidations";


const EditUser = () => {
    const dispatch=useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const email=useInput(currentUser.email,{isEmpty:true,minLength:5})
    const nickname=useInput(currentUser.nickname,{isEmpty:true,minLength:5})


    function changeHandler() {
        dispatch ( editUser ( nickname.value , email.value ) )
        dispatch(auth())
    }

    return (
        <div className="content">

            <div className="div-edit-user">
                <EditAvatar/>
                <MyInput onBlur={ e=>nickname.onBlur(e)} value={nickname.value} onChange={ e=>nickname.onChange(e)} type="text"/>
                <NicknameValidations nickname={nickname}/>
                <MyInput onBlur={ e=>email.onBlur(e)} value={email.value} onChange={ e=>email.onChange(e)} name="email" type="email" />
                <EmailValidations email={email}/>
                <Button className="edit-button" onClick={changeHandler}>Edit profile</Button>
            </div>

        </div>
    );
};

export default EditUser;