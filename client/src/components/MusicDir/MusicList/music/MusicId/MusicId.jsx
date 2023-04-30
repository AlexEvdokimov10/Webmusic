import React , {useEffect , useState} from 'react';
import {useParams} from "react-router-dom";
import {
    getAuthorByMusic ,
    getCurrentMusic ,
} from "../../../../../actions/musics";
import {useDispatch , useSelector} from "react-redux";
import classes from "./MusicId.module.css"
import MyImage from "../../../../UI/img/MyImage";
import musicLogo from "../../../../../assets/sound-music-logo.png";
import listens from "../../../../../assets/listens.png";
import CommentsForm from "../../../../comments/CommentsForm";
import Comments from "../../../../comments/Comments";
import {API_URL} from "../../../../../config";

const MusicId = () => {
    const params = useParams()
    const currentMusic = useSelector(state=>state.musics.currentMusic)
    const currentAuthor = useSelector(state=>state.musics.currentAuthor)
    const dispatch =useDispatch()
    const musicImg = API_URL + currentMusic?.image


    useEffect(()=> {
        dispatch(getCurrentMusic(params.id))
        dispatch(getAuthorByMusic(currentMusic))
    },[])

    return (
        <div style={{marginLeft:"250px"}}>
            <h1 style={{marginBottom:"10px"}}>
                {currentMusic?.name ? currentMusic.name.charAt(0).toUpperCase() + currentMusic.name.slice(1) : "None"}
            </h1>

            <div className={classes.music__content}>
                <MyImage className={classes.music__icon} src={ musicImg ? musicImg : musicLogo } alt="music image"/>
            </div>
            <div className={classes.music__listens}>
                <img width={40} height={35} src={listens}/>
                <div>
                    : {currentMusic?.listens?.length}
                </div>
            </div>
            <h3>
               Uploader : {currentAuthor?.nickname}
            </h3>
            <div>
                Description :
                {currentMusic?.description}
            </div>
            <CommentsForm id={params.id}/>
            <Comments id={params.id}/>
        </div>
    );
};

export default MusicId;