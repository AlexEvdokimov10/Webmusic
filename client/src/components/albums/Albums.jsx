import React, {useEffect, useState} from 'react';
import {Card , Col , Row} from "antd";
import Meta from "antd/es/card/Meta";
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AlbumsItem from "./AlbumsItem";
import {getAlbums} from "../../actions/albums";
import {playCurrentMusic, setActiveAuthorByMusic} from "../../actions/musics";
import {setActiveMusic, setEnd, setPause, setPlay} from "../../reducers/playerReducer";
import {setCurrentAlbum, setSongIndex} from "../../reducers/albumsReducer";
import {setCurrentPlaylist} from "../../reducers/playlistReducer";


const Albums = () => {
    const albums = useSelector(state => state.albums.albums)?.map((album)=>{
        return <AlbumsItem name={album.name} id={album._id} image={album.image} playMusic={playMusic} setStatusPause={setStatusPause}/>
    })
    const musics = useSelector ( state => state.albums.albumMusics )
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
        dispatch(setCurrentAlbum(album))
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
        <div className="disk">
            <div className="body wrapper clear">
                <h1>Albums</h1>
                {isCompositor && <NavLink className="add__albums" to="/createAlbums"> <PlusOutlined style={{fontSize:25,color:"black"}}/></NavLink>}
                <div style={{marginTop:20}}>
                    <Row justify="space-evenly">
                        {albums}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Albums;