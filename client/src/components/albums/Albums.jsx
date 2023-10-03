import React, {useEffect, useState} from 'react';
import {Card , Col , Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AlbumsItem from "./AlbumsItem";
import {getAlbums} from "../../actions/albums";
import {playCurrentMusic, setActiveAuthorByMusic} from "../../actions/musics";
import {setActiveMusic, setEnd, setPause, setPlay} from "../../reducers/playerReducer";
import {setPlayedAlbum, setSongIndex} from "../../reducers/albumsReducer";
import styles from './albums.module.css'



const Albums = () => {
    const albums = useSelector(state => state.albums.albums)?.map((album)=>{
        return <AlbumsItem name={album.name} id={album._id} image={album.image} playMusic={playMusic} setStatusPause={setStatusPause}/>
    })
    const musics = useSelector ( state => state.albums.albumPlayedMusics )
    const songIndex = useSelector ( state => state.albums.songIndex )
    const activeMusic = useSelector ( state => state.player.activeMusic )
    const pause = useSelector ( state => state.player.pause )
    const isEnd = useSelector(state => state.player.isEnd)
    const isCompositor = useSelector(state => state.user.isCompositor)

    const dispatch = useDispatch()

    function playAlbum( index ) {
        if(musics.includes(activeMusic)) {
            if (musics.length > 0) {
                if (activeMusic._id !== musics[index]._id) {
                    dispatch ( playCurrentMusic ( musics[index] ) )
                    dispatch ( setActiveMusic ( musics[index] ) )
                    dispatch ( setActiveAuthorByMusic ( musics[index] ) )
                    dispatch ( setEnd ( false ) )
                }
            }
        }
    }

    function setStatusPause(){
        if (pause) {
            dispatch(setPlay())
        } else {
            dispatch(setPause())
        }
    }

    function playMusic(album){
        dispatch(setPlayedAlbum(album))
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
        playAlbum(index)
    }

    useEffect(()=>{
       playAlbum(songIndex)
    },[musics])

    useEffect(()=>{
        dispatch(getAlbums(6))
    },[])

    useEffect(()=>{
        if(isEnd) {
            nextSong ()
        }
    },[isEnd])

    return (
            <div className="body wrapper clear">
                <h1>Albums</h1>
                {isCompositor && <NavLink to="/createAlbums"> <PlusOutlined className={styles.plus}/></NavLink>}
                <div className={styles.albums}>
                    <Row justify="space-evenly">
                        {albums}
                    </Row>
                </div>
            </div>
    );
};

export default Albums;