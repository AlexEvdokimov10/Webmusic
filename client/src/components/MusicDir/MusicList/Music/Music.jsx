import React from 'react';
import "./music.scss"
import musicLogo from '../../../../assets/sound-music-logo.png'
import playIcon from '../../../../assets/playIcon.png'
import downloadIcon from '../../../../assets/downloadIcon.png'
import deleteIcon from '../../../../assets/deleteIcon.png'
import {deleteMusic , downloadMusic , getMusic} from "../../../../actions/musics";
import {useDispatch} from "react-redux";

const Music = ({music}) => {

    const dispatch=useDispatch();

    function deleteClickHandler( event ) {
        event.stopPropagation()
        dispatch(deleteMusic(music))
    }
    function downloadClickHandler(event) {
        event.stopPropagation()
        downloadMusic ( music )
    }
    function playClickHandler(event) {
        getMusic(music)
    }

    return (
        <div>
            <div className="card">
                <span className="music-name">
                    { music.name.split ( "." )[ 0 ] }
                </span>
                <div className="content">

                        <img className="music-icon" width={ 142 } height={ 142 } src={ musicLogo } alt=""/>
                        <div className="d-flex">
                            <img src={downloadIcon} onClick={ ( event ) => downloadClickHandler ( event ) }
                                 className="music-download btn"/>
                            <img src={ playIcon } onClick={ ( event ) => playClickHandler ( event ) }
                                 className="music-play btn"/>
                            <img src={deleteIcon} onClick={ ( event ) => deleteClickHandler ( event ) }
                                 className="music-delete btn"/>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Music;