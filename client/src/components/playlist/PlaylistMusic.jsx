import React , {useEffect} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {API_URL} from "../../config";
import {CaretRightOutlined , DeleteOutlined , PauseOutlined} from "@ant-design/icons";
import styles from "./playlistMusic.module.css"
import {playCurrentMusic , setActiveAuthorByMusic} from "../../actions/musics";
import {setActiveMusic , setEnd , setPause , setPlay} from "../../reducers/playerReducer";
import {setCurrentPlaylist , setSongIndex} from "../../reducers/playlistReducer";
import {deleteMusicInPlaylist} from "../../actions/playlist";
const PlaylistMusic = ({music,playlist,index,playPlaylist}) => {

    const musicImg = API_URL + music.image
    const pause = useSelector ( state => state.player.pause )
    const activeMusic = useSelector ( state => state.player.activeMusic )
    const checkMusic = activeMusic._id === music._id
    const dispatch = useDispatch()

    function playMusic(){
        playPlaylist(index)
        dispatch(setCurrentPlaylist(playlist))
    }

    function deleteMusic(){
        dispatch(deleteMusicInPlaylist(playlist,music))
    }

    return (
       <div style={{display:"flex",width:200,height:100}}>
           <span style={{fontSize:20, width:90}}> {music.name} </span>
           <img style={{width:"60px", height:"50px"}} src={musicImg} />
           {checkMusic ?
               pause ? <CaretRightOutlined onClick={ ()=>playMusic() } style={{fontSize:25,marginTop:10}}/>
                   :<PauseOutlined onClick={ ()=>playMusic() } style={{fontSize:25,marginTop:10}} />
               :
               <CaretRightOutlined onClick={ ()=>playMusic() } style={{fontSize:25,marginTop:10}}/>

           }
           <DeleteOutlined onClick={()=>deleteMusic()} style={{fontSize:25,marginTop:10}}/>
       </div>
    );
};

export default PlaylistMusic;