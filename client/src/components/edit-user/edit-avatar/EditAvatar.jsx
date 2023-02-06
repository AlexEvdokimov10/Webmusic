import React from 'react';
import {deleteAvatar , uploadAvatar} from "../../../actions/user";
import {useDispatch , useSelector} from "react-redux";
import "./edit-avatar.scss"

const EditAvatar = () => {
    const dispatch=useDispatch();
    function changeAvatar(e){
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    return (
        <div className="edit-profile">
            <label className="change-avatar">
                <input className="input-avatar" accept="image/*" onChange={e=>changeAvatar(e)} type='file' placeholder="Download avatar" />
                <div>
                    Change avatar
                </div>
            </label>
            <div>
                <button className="change-avatar" onClick={()=>dispatch(deleteAvatar())}>Delete avatar</button>
            </div>
        </div>
    );
};

export default EditAvatar;