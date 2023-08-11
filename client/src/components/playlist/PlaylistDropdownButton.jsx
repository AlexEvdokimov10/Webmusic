import React from 'react';
import {Dropdown , Space} from "antd";
import {MoreOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import { openModal} from "../../reducers/playlistReducer";

const PlaylistDropdownButton = ( {playlists}) => {
    const dispatch = useDispatch()
    return (
        <Dropdown.Button size="small" icon={<MoreOutlined style={{fontSize:15,cursor:"pointer"}}/>} onClick={()=>{dispatch(openModal())}} menu={{ items:playlists }}>
            <p style={{fontSize:10}}>Add Playlist</p>
        </Dropdown.Button>
    );
};

export default PlaylistDropdownButton;