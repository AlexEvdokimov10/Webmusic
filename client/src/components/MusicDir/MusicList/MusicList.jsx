import React , {useEffect , useState} from 'react';
import {useSelector} from "react-redux";
import Music from "./music/Music";
import "./musiclist.scss"
import AddPlaylistForm from "../../playlist/AddPlaylistForm";
import Playlists from "../../playlist/Playlists";

const MusicList = () => {
    const musics=useSelector(state=> state.musics.musics).map(music => <Music key={music._id} music={music}/>)

    if(!musics.length) {
        return (
            <h1 style={ { textAlign: "center" } }>
                Musics wasn't found
            </h1>
        )
    }

    return (
        <div>
            <div style={{marginLeft:"90%"}}>
                <Playlists/>
            </div>
            <div className="music-list">
                {musics}
            </div>
            <AddPlaylistForm/>
        </div>
    );
};

export default MusicList;