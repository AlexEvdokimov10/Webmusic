import React , {useEffect , useState} from 'react';
import MusicList from "./MusicList/MusicList";
import FindLogo from "../../assets/Union.svg"
import "./musicDir.scss"
import {useDispatch , useSelector} from "react-redux";
import SelectMusics from "../selectMusics/SelectMusics";
import {NavLink} from "react-router-dom";
import {FilterOutlined, PlusCircleOutlined} from "@ant-design/icons";
import MyInput from "../UI/input/MyInput";
import {Pagination} from "antd";
import {setPage} from "../../reducers/musicReducer";
import FilterMusic from "../filter/FilterMusic";
import Loader from "../loader/Loader";
import Chat from "../chat/Chat";
import Music from "./MusicList/music/Music";
import SearcherMusic from "../searchMusic/SearcherMusic";

const MusicDir = ({applyFilter,search,musicIsLoaded,searchName,sort,checkedList,setCheckedList,setSort}) => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.musics.page)
    const totalCountPages = useSelector(state=>state.musics.totalPage)

    useEffect(()=>{
        dispatch(setPage(0))
    },[])
    const changePage = (page) => {
        dispatch(setPage(page))
    }

    return (
            <div className="body wrapper clear">
                    <div className="content">
                        <SearcherMusic checkedList={checkedList} setCheckedList={setCheckedList} search={search} searchName={searchName} applyFilter={applyFilter}/>
                        <SelectMusics sort={sort} onChange={(value)=>setSort(value)}/>
                    </div>
                    {musicIsLoaded ? <Loader/> : <MusicList/>}
                <Pagination defaultCurrent={1} onChange={(page) => changePage(page-1)}  total={totalCountPages*10} />
                <Chat/>
            </div>
    );
};

export default MusicDir;