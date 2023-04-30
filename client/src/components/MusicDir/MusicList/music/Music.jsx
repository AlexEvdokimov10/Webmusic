import React , {useEffect , useState} from 'react';
import "./music.scss"
import musicLogo from '../../../../assets/sound-music-logo.png'
import playIcon from '../../../../assets/playIcon.png'
import downloadIcon from '../../../../assets/downloadIcon.png'
import deleteIcon from '../../../../assets/deleteIcon.png'
import pauseIcon from '../../../../assets/pauseIcon.png'
import likeNoActiveIcon from "../../../../assets/like_no_active.png"
import likeActiveIcon from "../../../../assets/filled-like.png"
import infoIcon from "../../../../assets/info.png"
import {
    deleteMusic ,
    downloadMusic , like ,
    playCurrentMusic , setActiveAuthorByMusic
} from "../../../../actions/musics";
import {useDispatch , useSelector} from "react-redux";
import {HeartOutlined , SettingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {setActiveMusic , setPause , setPlay} from "../../../../reducers/playerReducer";
import {API_URL} from "../../../../config";
import moment from "moment/moment";


const Music = ( { music } ) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const pause = useSelector ( state => state.player.pause )
    const activeMusic = useSelector ( state => state.player.activeMusic )
    const checkMusic = activeMusic._id === music._id
    const musicImg = API_URL + music.image
    const [isLike,setIsLike] = useState(false)
    const isAuthor = music.author === currentUser.id
    const [listens, setListens] = useState(0)
    const router = useNavigate ()
    const dispatch = useDispatch ();

    function deleteClickHandler( event ) {
        event.stopPropagation ()
        dispatch ( deleteMusic ( music ) )
    }

    function downloadClickHandler( event ) {
        event.stopPropagation ()
        downloadMusic ( music )
    }

    function playClickHandler() {
        if (! checkMusic) {
            dispatch ( playCurrentMusic ( music ) )
            dispatch ( setActiveMusic ( music ) )
            dispatch ( setActiveAuthorByMusic ( music ) )
        }
        if (pause) {
            dispatch ( setPlay () )
        } else {
            dispatch ( setPause () )
        }
    }
    useEffect(()=>{
        setListens(music.listens.length)
        if(music.likes.includes(currentUser.id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    },[music])

    function likeClickHandler(){
        dispatch(like(music))
    }

    return (
        <div>
            <div className="card">
                <div className="music-name">
                    { music.name.charAt ( 0 ).toUpperCase () + music.name.slice ( 1 ) }
                </div>
                <div className="content">
                    <img className="music-icon" width={ 180 } height={ 142 } src={ music.image ? musicImg : musicLogo }
                         alt=""/>
                    <div className="d-flex">
                        <img src={ downloadIcon } onClick={ ( event ) => downloadClickHandler ( event ) }
                             className="music-download btn"/>
                        { checkMusic ?
                            <img src={ pause ? playIcon : pauseIcon } onClick={ playClickHandler }
                                 className="music-play btn"/>
                            :
                            <img src={ playIcon } onClick={ playClickHandler }
                                 className="music-play btn"/>
                        }
                        {isAuthor ? <img src={ deleteIcon } onClick={ ( event ) => deleteClickHandler ( event ) }
                             className="music-delete btn"/>
                            :
                            <img src={ infoIcon } onClick={ () => router ( `/musics/${ music._id }` ) }
                                                                   className="music-delete btn"/>
                        }
                    </div>
                </div>
                <div>
                    <img style={{width:20,height:19,cursor:"pointer"}} src={isLike ? likeActiveIcon:likeNoActiveIcon } onClick={likeClickHandler}/>
                    <span style={{marginLeft:30}}>
                        listens : {listens}
                    </span>
                    <span style={{fontSize:"18px", marginLeft:"10px"}}>
                        { moment ( music.time * 1000 ).format ( "mm:ss" ) }
                    </span>
                </div>
                <span className="music-name">
                    Upload date : { music.date.slice ( 0 , 10 ) }
                </span>
                <span> <SettingOutlined className="music-settings"
                                        onClick={ () => router ( `/musics/${ music._id }` ) }/> </span>
            </div>
        </div>
    );
};

export default Music;