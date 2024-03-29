import React, {useEffect} from 'react';
import pauseIcon from "../../assets/pauseIcon.png";
import playIcon from "../../assets/playIcon.png";
import musicLogo from '../../assets/sound-music-logo.png'
import {useDispatch, useSelector} from "react-redux";
import styles from "./player.module.css"
import MyImage from "../UI/img/MyImage";
import MusicProgress from "../music-progress/MusicProgress";
import {SoundOutlined} from "@ant-design/icons";
import {
    setBuffered,
    setCurrentTime,
    setDuration,
    setEnd,
    setPause,
    setPlay,
    setVolume
} from "../../reducers/playerReducer";
import VolumeProgress from "../volume-progress/VolumeProgress";
import {API_URL} from "../../config";

let audio;

const Player = () => {

    const {
        activeMusic,
        activeAuthor,
        volume,
        duration,
        currentTime,
        pause,
        isEnd,
        link,
        buffered
    } = useSelector(state => state.player)
    const musicImg = API_URL + activeMusic.image
    const dispatch = useDispatch()

    const changeVolume = (e) => {
        audio.volume = Number(e.target.value) / 100
        dispatch(setVolume(e.target.value))
    }

    const changeCurrentTime = (e) => {
        audio.currentTime = Number(e.target.value)
        dispatch(setCurrentTime(e.target.value))

    }
    const checkPause = () => {
        if (!pause) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            audio.volume = volume / 100
        } else {
            setAudio()
        }
        audio.onended = () => {
            dispatch(setEnd(true))
        }
    }, [link])

    useEffect(() => {
        checkPause()
    }, [pause])

    useEffect(() => {
        return () => {
            dispatch(setCurrentTime(0))
        }
    }, [])

    const setAudio = () => {
        if (activeMusic) {
            audio.src = link

            dispatch(setDuration(activeMusic.time))

            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
                for (let i = 0; i < audio.buffered.length; i++) {
                    if (
                        audio.buffered.start(audio.buffered.length - 1 - i) <
                        audio.currentTime
                    ) {
                        console.log("ok")
                        dispatch(setBuffered(Math.ceil(audio.buffered.end(audio.buffered.length - 1 - i) / duration)))
                    }
                }
            }

            dispatch(setPlay())
        }
    }

    function playClickHandler() {
        if (pause) {
            dispatch(setPlay())
        } else {
            dispatch(setPause())
        }
    }

    if (!activeMusic.name) {
        return <div>
        </div>
    }
    return (
        <div className={styles.player}>
            {pause ?
                <MyImage className={styles.player__icon} src={playIcon} onClick={playClickHandler}/>
                :
                <MyImage className={styles.player__icon} src={pauseIcon} onClick={playClickHandler}/>
            }
            <div>
                <div> Name: {activeMusic.name.split(".")[0]} </div>
                <div> Author: {activeAuthor.nickname} </div>
            </div>
            <MyImage className={styles.player__image} src={activeMusic.image ? musicImg : musicLogo}></MyImage>
            <MusicProgress left={currentTime} right={duration} buffered={buffered}
                           onChange={(e) => (changeCurrentTime(e))}/>
            <SoundOutlined className={styles.player__volumeIcon}/>
            <VolumeProgress className={styles.player__volume} left={volume} right={100} onChange={(e) => (changeVolume(e))}/>
        </div>
    );
};

export default Player;