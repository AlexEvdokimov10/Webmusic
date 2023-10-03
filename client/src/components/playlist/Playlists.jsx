import React , {useEffect} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {Menu} from "antd";
import {addMusic , getMusicsByPlaylist} from "../../actions/playlist";
import PlaylistMusic from "./PlaylistMusic";
import {CaretRightOutlined , PauseOutlined , StepForwardOutlined} from "@ant-design/icons";
import {playCurrentMusic , setActiveAuthorByMusic} from "../../actions/musics";
import {setActiveMusic , setEnd , setPause , setPlay} from "../../reducers/playerReducer";
import {setCurrentPlaylist , setSongIndex} from "../../reducers/playlistReducer";
import styles from './playlists.module.css'

const Playlists = () => {
    const musics = useSelector ( state => state.playlist.playlistMusics )
    const songIndex = useSelector ( state => state.playlist.songIndex )
    const currentPlaylist = useSelector(state => state.playlist.currentPlaylist)
    const activeMusic = useSelector ( state => state.player.activeMusic )
    const pause = useSelector ( state => state.player.pause )
    const isEnd = useSelector(state => state.player.isEnd)
    const playlists = useSelector ( state => state.playlist.playlists ).map ( ( playlist ) => {
        return {
            key: playlist._id ,
            label: <div onMouseEnter={ ( event ) => addMusicToPlaylist ( playlist ) }>
                {currentPlaylist._id === playlist._id ?
                    <StepForwardOutlined  onClick={ () => playMusic(playlist) } style={ { fontSize: 20 } }/>
                    :
                    <CaretRightOutlined onClick={ () => playMusic(playlist) } style={ { fontSize: 20 } }/>

                }
                { playlist.name }
            </div> ,
            children: musics.map ( ( music ,index) => {
                return {
                    key: music._id ,
                    label: <PlaylistMusic music={ music } index={index} playlist={playlist} playPlaylist={playPlaylist}/> ,
                }
            } ) ,
        }
    } )

    const dispatch = useDispatch ()

    function playMusic(playlist){
        nextSong()
        dispatch(setCurrentPlaylist(playlist))
    }

    function addMusicToPlaylist( playlist ) {
        dispatch ( getMusicsByPlaylist ( playlist ) )
    }

    function playPlaylist( index ) {
        if(musics.length>0) {
            const checkMusic = activeMusic._id === musics[index]._id
            if (! checkMusic) {
                dispatch ( playCurrentMusic ( musics[index] ) )
                dispatch ( setActiveMusic ( musics[index] ) )
                dispatch ( setActiveAuthorByMusic ( musics[index] ) )
                dispatch ( setEnd ( false ) )
            }
            if (pause) {
                dispatch ( setPlay () )
            } else {
                dispatch ( setPause () )
            }
        }
    }

    function nextSong() {
        let index
        if (songIndex >= musics.length -1 ) {
            index = 0;
            dispatch ( setSongIndex ( index ) );
        } else {
            index = songIndex + 1
            dispatch ( setSongIndex ( index ) );
        }
        playPlaylist ( index )
    }

    useEffect(()=>{
        if(isEnd) {
            nextSong ()
        }
    },[isEnd])


    return (
        <div className={styles.playlists}>
            Playlists
            <Menu items={ playlists }>
            </Menu>
        </div>
    );
};

export default Playlists;