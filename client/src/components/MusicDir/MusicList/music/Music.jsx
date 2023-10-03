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
import {DownOutlined , MoreOutlined , SettingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {setActiveMusic , setPause , setPlay} from "../../../../reducers/playerReducer";
import {API_URL} from "../../../../config";
import moment from "moment/moment";
import {Dropdown , Space} from "antd";
import PlaylistDropdownButton from "../../../playlist/PlaylistDropdownButton";
import PlaylistItem from "../../../playlist/PlaylistItem";
import MusicStats from "./musicStats/MusicStats";


const Music = ( { music} ) => {
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

    const playlists = useSelector((state)=>state.playlist.playlists).map((playlist)=>{
        return {
            key:playlist._id,
            label:
                <PlaylistItem playlist={playlist} music={music}/>
        }
    })

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
        setListens(music?.listens?.length)
        if(music?.likes?.includes(currentUser.id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    },[music])

    function likeClickHandler(){
        dispatch(like(music))
    }

    return (
            <div className="card">
                <div className="card__musicName">
                    { music?.name?.charAt ( 0 ).toUpperCase () + music?.name?.slice ( 1 ) }
                </div>
                <div className="card__content">
                    <img className="card__musicIcon" src={ music.image ? musicImg : musicLogo }
                         alt="music-icon"/>
                    <div className="card__control">
                        <img src={ downloadIcon } onClick={ ( event ) => downloadClickHandler ( event ) }
                             className="card__musicDownload btn"/>
                        { checkMusic ?
                            <img src={ pause ? playIcon : pauseIcon } onClick={ playClickHandler }
                                 className="card__musicPlay btn"/>
                            :
                            <img src={ playIcon } onClick={ playClickHandler }
                                 className="card__musicPlay btn"/>
                        }
                        {isAuthor ? <img src={ deleteIcon } onClick={ ( event ) => deleteClickHandler ( event ) }
                             className="card__musicDelete btn"/>
                            :
                            <img src={ infoIcon } onClick={ () => router ( `/musics/${ music._id }` ) }
                                                                   className="card__musicDelete btn"/>
                        }
                    </div>
                </div>
                <MusicStats music={music} isLike={isLike} likeClickHandler={likeClickHandler} listens={listens} playlists={playlists}/>
            </div>

    );
};

export default Music;