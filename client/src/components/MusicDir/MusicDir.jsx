import React , {useEffect , useState} from 'react';
import MusicList from "./MusicList/MusicList";
import FindLogo from "../../assets/Union.svg"
import UploadIcon from "../../assets/uploadIcon.png"
import "./musicDir.scss"
import {useDispatch , useSelector} from "react-redux";
import {getMusics , searchMusics , uploadMusic} from "../../actions/musics";
import Audio from "../UI/audio/Audio";
import Select from "../UI/select/Select";

const MusicDir = () => {
    const dispatch = useDispatch()
    const link = useSelector(state => state.musics.link)
    const [sort,setSort]=useState("name")
    const [searchName,setSearchName] = useState('')
    function musicUploadHandler(event) {
        const musics=[...event.target.files]
        musics.forEach(music=>dispatch(uploadMusic(music)))
    }

    useEffect(()=>{
        dispatch(getMusics(sort))
    },[sort])

    useEffect(()=>{
        console.log(link)
    })

    function searchChangeHandler( e ) {
        setSearchName(e.target.value)
        dispatch(searchMusics(e.target.value))
    }

    return (
        <div className="disk">
            <div className="body wrapper clear">
                <div className="content">
                    <div className="align-center">
                        <h1>My directory</h1>
                        <div className="search-block">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <input value={searchName} onChange={e=>searchChangeHandler(e)} className="find-input" placeholder="Search..."/>
                        </div>
                        <Select className="sorting" value={sort} onChange={(e)=>setSort(e.target.value)}>
                            <option value="name"> Name </option>
                            <option value="type"> Type </option>
                            <option value="date"> Date </option>
                        </Select>
                        <Audio id="audio" src={link} controls>
                            <source id="music" type="audio/ogg"  />
                        </Audio>
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