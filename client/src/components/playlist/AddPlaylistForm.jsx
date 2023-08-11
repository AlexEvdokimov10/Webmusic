import React , {useEffect} from 'react';
import {Input , Modal} from "antd";
import {useInput} from "../../hooks/useInput";
import AddButton from "../UI/buttons/AddButton";
import MyModal from "../UI/ModalWindow/MyModal";
import {useDispatch , useSelector} from "react-redux";
import {createPlaylist} from "../../actions/playlist";
import styles from "./addPlaylistForm.module.css"

const AddPlaylistForm = () => {
    const name = useInput("",{isEmpty:true,minLength:1})
    const isShowModal = useSelector(state => state.playlist.isShowModal)
    const dispatch = useDispatch()
    function addNewPlaylist(){
        dispatch(createPlaylist(name.value))
    }

    return (
        <MyModal open={isShowModal}>
            <div className={styles.title}> Add New Playlist </div>
            <Input value={name.value} onChange={(event)=>name.setValue(event.target.value)} placeholder="Input playlist name..."/>
            <AddButton onClick={()=>addNewPlaylist()}>
                Add new playlist
            </AddButton>
        </MyModal>
    );
};

export default AddPlaylistForm;