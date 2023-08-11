import React, {useEffect, useState} from 'react';
import {Button, Input, Select} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Music from "../MusicDir/MusicList/music/Music";
import {API_URL} from "../../config";
import {auth, editUser, editUserProfile, getRoles, getUserProfile} from "../../actions/user";
import {useInput} from "../../hooks/useInput";
import EditAvatar from "../edit-user/edit-avatar/EditAvatar";
import MyInput from "../UI/input/MyInput";
import NicknameValidations from "../validations/NicknameValidations";
import EmailValidations from "../validations/EmailValidations";
import SelectRoles from "./SelectRoles";

const EditUserPanel = () => {
    const userProfile = useSelector(state => state.user.currentProfile)
    const email = useInput(userProfile.email, {isEmpty: true, minLength: 5})
    const nickname = useInput(userProfile.nickname, {isEmpty: true, minLength: 5})
    const roles = useInput(userProfile.roles, {isEmpty: true})
    const options = useSelector ( state => state.roles.roles).map ( ( role ) => {
        return {
            label: role.value ,
            value: role.value
        }
    } )
    const avatar = API_URL + userProfile.avatar
    const params = useParams()
    const dispatch = useDispatch()


    useEffect(()=>{
        nickname.setValue(userProfile.nickname)
        email.setValue(userProfile.email)
        roles?.setValue(userProfile?.roles)
    },[userProfile])

    const chooseRole = (value) => {
        roles.setValue({...roles,value})
    };

    function changeHandler() {
        dispatch(editUserProfile(params.id,nickname.value,email.value,roles.value))
    }

    return (
        <div className="content">
            <div className="div-edit-user">
                <MyInput onBlur={e => nickname.onBlur(e)} value={nickname.value} onChange={e => nickname.onChange(e)}
                         type="text"/>
                <NicknameValidations nickname={nickname}/>
                <MyInput onBlur={e => email.onBlur(e)} value={email.value} onChange={e => email.onChange(e)}
                         name="email" type="email"/>
                <EmailValidations email={email}/>
                <SelectRoles chooseRole={chooseRole} options={options} roles={roles}/>
                <Button className="edit-button" onClick={changeHandler}>Edit profile</Button>
            </div>
        </div>
    );
};

export default EditUserPanel;