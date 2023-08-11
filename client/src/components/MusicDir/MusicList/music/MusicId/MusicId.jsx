import React , {useEffect , useState} from 'react';
import {NavLink , useParams} from "react-router-dom";
import {
    getAuthorByMusic ,
    getCurrentMusic ,
} from "../../../../../actions/musics";
import {useDispatch , useSelector} from "react-redux";
import classes from "./MusicId.module.css"
import MyImage from "../../../../UI/img/MyImage";
import musicLogo from "../../../../../assets/sound-music-logo.png";
import listens from "../../../../../assets/listens.png";
import editIcon from "../../../../../assets/edit.png";
import CommentsForm from "../../../../comments/CommentsForm";
import Comments from "../../../../comments/Comments";
import {API_URL} from "../../../../../config";
import {Avatar} from "antd";
import {getUserProfile} from "../../../../../actions/user";
import {setPage} from "../../../../../reducers/musicReducer";

const MusicId = () => {
    const params = useParams()
    const currentMusic = useSelector(state=>state.musics.currentMusic)
    const currentAuthor = useSelector(state=>state.musics.currentAuthor)
    const dispatch =useDispatch()
    const musicImg = API_URL + currentMusic?.image
    const authorAvatar = API_URL + currentAuthor?.avatar


    useEffect(()=> {
        dispatch(getCurrentMusic(params.id))
    },[])
    useEffect(()=>{
        if(currentMusic?.author) {
            dispatch(getAuthorByMusic(currentMusic))
        }
    },[currentMusic])

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
            <NavLink onClick={()=>{
                dispatch(getUserProfile(currentAuthor._id))
                dispatch(setPage(0))
            }} className={classes.avatar}  to={`/profile/${currentAuthor._id}`}>
                { currentAuthor?.avatar ?
                <Avatar className={classes.avatar} src={authorAvatar} size={50} />
                :
                <Avatar className={classes.avatar} size={50}> {currentAuthor?.nickname?.charAt(0).toUpperCase()} </Avatar>
                }
                <span style={{marginLeft:10,fontSize:20,textDecoration:"none",color:"black"}}>{currentAuthor?.nickname}</span>
            </NavLink>
            <div style={{fontSize:18,marginTop:10}}>
                <b> Description: </b>
                <div>
                {currentMusic?.description}
                </div>
            </div>
            {currentAuthor?._id === currentMusic?.author &&
            <NavLink to={`/editMusic/${currentMusic._id}`} >
                <img src={editIcon} style={{width:30, height:25, marginTop:10}}/>
            </NavLink>
            }
            <CommentsForm id={params.id}/>
            <Comments id={params.id}/>
        </div>
    );
};

export default MusicId;