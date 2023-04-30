import React , {useEffect , useState} from 'react';
import MusicList from "./MusicList/MusicList";
import FindLogo from "../../assets/Union.svg"
import UploadIcon from "../../assets/uploadIcon.png"
import "./musicDir.scss"
import {useDispatch , useSelector} from "react-redux";
import {getMusics , searchMusics , uploadMusic} from "../../actions/musics";
import Audio from "../UI/audio/Audio";
import Select from "../UI/select/Select";
import UploaderMusic from "../uploaders/UploaderMusic";
import SelectMusics from "../selectMusics/SelectMusics";
import {NavLink} from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons";
import MyInput from "../UI/input/MyInput";
import {getAllGenres} from "../../actions/genres";
import {setPage} from "../../reducers/pageReducer";
import {Pagination} from "antd";

const MusicDir = () => {
    const dispatch = useDispatch()
    const [sort,setSort]=useState("name")
    const [searchName,setSearchName] = useState('')
    const page = useSelector(state => state.page.page)
    const totalCountPages = useSelector(state=>state.page.totalPage)
    const [limit,setLimit] = useState(6)


    useEffect(()=>{
        dispatch(getMusics(sort,limit,page))
        dispatch(getAllGenres())
    },[sort,page])


    function searchChangeHandler( e ) {
        setSearchName(e.target.value)
        dispatch(searchMusics(e.target.value))
    }

    const changePage = (page) => {
        dispatch(setPage(page))
    }

    return (
        <div className="disk">
            <div className="body wrapper clear">
                <div className="content">
                    <h1>My directory</h1>
                    <div style={{display:"flex"}}>
                        <div className="search-block">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <MyInput style={{borderRadius:"50px",marginLeft:"2px"}} value={searchName} onChange={e=>searchChangeHandler(e)} className="find-input" placeholder="Search..."/>
                        </div>
                        <SelectMusics sort={sort} onChange={(e)=>setSort(e.target.value)}/>
                        <NavLink to="/recommends" style={{width:"20px", marginTop:"15px"}}> <span style={{color:"black", fontWeight:"bold", marginLeft:"100px", fontSize:"20px"}}> Recommends</span> </NavLink>
                        <NavLink className="upload" to="/upload"> <PlusCircleOutlined  style={{color:"black",fontSize:35, marginTop:"10px"}}/> </NavLink>
                    </div>
                    <MusicList/>
                </div>
                <Pagination defaultCurrent={page+1} onChange={(page) => changePage(page-1)}  total={totalCountPages*10} />
            </div>
        </div>
    );
};

export default MusicDir;