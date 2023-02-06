import React , {useEffect , useState} from 'react';
import {useSelector} from "react-redux";
import Music from "./Music/Music";
import "./musiclist.scss"

const MusicList = () => {
    const musics=useSelector(state=> state.musics.musics).map(music => <Music key={music.id} music={music}/>)

    return (
        <div>
            <div className="music-list">
                {musics}
            </div>
        </div>
    );
};

export default MusicList;