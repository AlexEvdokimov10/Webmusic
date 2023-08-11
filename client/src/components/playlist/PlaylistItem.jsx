import React , {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addMusic , deletePlaylist} from "../../actions/playlist";
import {CheckOutlined , DeleteOutlined} from "@ant-design/icons";

const PlaylistItem = ({playlist,music}) => {

    const dispatch = useDispatch()

    function addMusicToPlaylist(){
        dispatch(addMusic(music,playlist))
    }
    function checkMusicInPlaylist(){
        return music.playlists.includes(playlist._id)
    }
    function deleteOnePlaylist() {
        dispatch(deletePlaylist(playlist))
    }


    return (
        <div>
            <div onClick={()=>addMusicToPlaylist()}>
                {playlist.name}
                {checkMusicInPlaylist() ? <CheckOutlined /> :
                    <span></span>
                }
                <span> <DeleteOutlined onClick={()=>(deleteOnePlaylist())} /> </span>
            </div>
        </div>
    );
};

export default PlaylistItem;