import React , {useEffect} from 'react';
import MusicList from "./MusicList/MusicList";
import FindLogo from "../../assets/Union.svg"
import UploadIcon from "../../assets/uploadIcon.png"
import "./musicDir.scss"
import {useDispatch , useSelector} from "react-redux";
import {getMusics , uploadMusic} from "../../actions/musics";


const MusicDir = () => {
    const dispatch = useDispatch()
    const musics = useSelector(state=>state.musics)
    function musicUploadHandler(event) {
        const musics=[...event.target.files]
        musics.forEach(music=>dispatch(uploadMusic(music)))
    }

    useEffect(()=>{
        dispatch(getMusics())
    },[musics])

    return (
        <div className="disk">
            <div className="body wrapper clear">
                <div className="content">
                    <div className="align-center">
                        <h1>All Music</h1>
                        <div className="search-block">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <input className="find-input" placeholder="Search"/>
                            <audio id="audio" controls>
                                <source id="music" type="audio/ogg" />
                            </audio>
                        </div>
                    </div>
                    <MusicList/>
                </div>
                <div className="music_upload">
                    <label htmlFor="music_upload-input" className="music_upload-label">Upload</label>
                    <label className="music" style={{cursor:"pointer"}}>
                        <input multiple={true} name="file" style={{visibility:"hidden"}} onChange={(event)=>musicUploadHandler(event)} type="file" id="music_upload-input"  className="music_upload-input" />
                        <img width={40} height={40} src={UploadIcon} alt="Upload"/>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MusicDir;