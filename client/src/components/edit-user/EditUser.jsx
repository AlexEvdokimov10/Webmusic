import React , {useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import "./edituser.scss"
import {deleteAvatar , editUser , uploadAvatar} from "../../actions/user";
import Input from "../../utils/input/Input";
import EditAvatar from "./edit-avatar/EditAvatar";


const EditUser = () => {
    const dispatch=useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const [email,setEmail]=useState(currentUser.email)
    const [nickname,setNickname]=useState(currentUser.nickname)


    function changeHandler(nickname,email){
        dispatch(editUser(nickname,email))
    }


    return (
        <div className="content">

            <div className="div-edit-user">
                <EditAvatar/>

                <Input type="text" value={nickname} setValue={setNickname}/>

                <Input type="text" value={email} setValue={setEmail}/>

                <button className="edit-button" onClick={() => changeHandler ( nickname,email )}>Edit profile</button>
            </div>

        </div>
    );
};

export default EditUser;