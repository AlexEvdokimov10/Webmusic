import React , {useEffect} from 'react';
import MusicList from "./MusicList/MusicList";
import FindLogo from "../../assets/Union.svg"
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
                <div className="content p40">
                    <div className="d-flex align-center mb-40">
                        <h1>All Music</h1>
                        <div className="search-block ml-30 d-flex">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <input className="mw-100" placeholder="Search"/>
                        </div>
                    </div>
                    <MusicList/>
                </div>
                <div className="disk_upload">
                    <label htmlFor="disk_upload-input" className="disk_upload-label">Upload</label>
                    <label className="file">
                        <input multiple={true} name="file" aria-label="File browser example" onChange={(event)=>musicUploadHandler(event)} type="file" id="disk_upload-input"  className="disk_upload-input" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MusicDir;