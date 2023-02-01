import React from 'react';
import "./music.scss"
import musicLogo from '../../../../assets/sound-music-logo.png'
import {deleteMusic} from "../../../../actions/musics";
import {useDispatch} from "react-redux";

const Music = ({music}) => {

    const dispatch=useDispatch();

    function deleteClickHandler( event ) {
        event.stopPropagation()
        dispatch(deleteMusic(music))
    }

    return (
        <div>
            <div className="card ml-10 ">
                <span className="music-name">
                    {music.name.split(".")[0]}
                </span>
                <div className="content">
                    <div>
                    </div>
                    <div className="card-background br-radius">
                        <button className="mt-30">
                            <img className="br-radius m-5" width={ 142 } height={ 142 } src={musicLogo} alt=""/>
                        </button>
                    </div>
                    <div className="d-flex">
                        <button onClick={ ( event ) => deleteClickHandler ( event ) } className="music-delete btn">delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;