import React , {useEffect} from 'react';
import pauseIcon from "../../assets/pauseIcon.png";
import playIcon from "../../assets/playIcon.png";
import musicLogo from '../../assets/sound-music-logo.png'
import {useDispatch , useSelector} from "react-redux";
import styles from "./player.module.css"
import MyImage from "../UI/img/MyImage";
import MusicProgress from "../music-progress/MusicProgress";
import {SoundOutlined} from "@ant-design/icons";
import {setCurrentTime , setDuration , setPause , setPlay , setVolume} from "../../reducers/playerReducer";
import VolumeProgress from "../volume-progress/VolumeProgress";
import {API_URL} from "../../config";

let audio;

const Player = () => {

    const {activeMusic,activeAuthor,volume,duration,currentTime,pause,link} = useSelector(state=> state.player)
    const musicImg = API_URL + activeMusic.image
    const dispatch = useDispatch()

    const changeVolume = (e) =>{
        audio.volume =Number(e.target.value)/100
        dispatch(setVolume(e.target.value))
    }
    const changeCurrentTime = (e) =>{
        audio.currentTime =Number(e.target.value)
        dispatch(setCurrentTime(e.target.value))
    }
    const checkPause = () =>{
        if(!pause){
            audio.play()
        } else {
            audio.pause()
        }
    }

    useEffect(()=>{
        if(!audio){
            audio=new Audio()
            audio.volume = volume/100
        }else{
            setAudio()
        }
    },[link])
    useEffect(()=>{
        checkPause()
    },[pause])



    const setAudio = () => {
        if(activeMusic){
            audio.src = link

            dispatch(setDuration(activeMusic.time))

            audio.ontimeupdate = () =>{
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
            dispatch(setPlay())
        }
    }

    function playClickHandler() {
        if(pause){
            dispatch(setPlay())
        }
        else {
            dispatch(setPause())
        }
    }
    if(!activeMusic.name){
        return <div>
        </div>
    }
    return (
        <div className={styles.player}>
            {pause ?
                <MyImage className={styles.music__icon} src={ playIcon } onClick={playClickHandler}/>
                :
                <MyImage className={styles.music__icon} src={ pauseIcon } onClick={playClickHandler}/>
            }
            <div>
                <div> Name: {activeMusic.name.split ( "." )[ 0 ]} </div>
                <div> Author: {activeAuthor.nickname} </div>
            </div>
            <MyImage className={styles.music__player} src={activeMusic.image ? musicImg : musicLogo}></MyImage>
            <MusicProgress left={currentTime} right={duration} onChange={(e)=>(changeCurrentTime(e))}/>
            <SoundOutlined style={{marginLeft:'auto'}}/>
            <VolumeProgress left={volume} right={100} onChange={(e)=>(changeVolume(e))}/>
        </div>
    );
};

export default Player;