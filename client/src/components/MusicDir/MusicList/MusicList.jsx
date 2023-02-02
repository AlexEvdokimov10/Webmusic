import React from 'react';
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
            <audio id="audio" controls>
                <source id="music" type="audio/ogg" />
            </audio>
        </div>
    );
};

export default MusicList;