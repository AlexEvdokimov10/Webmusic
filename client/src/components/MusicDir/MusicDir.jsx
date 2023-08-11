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

const MusicDir = ({applyFilter,search,musicIsLoaded,searchName,sort,checkedList,setCheckedList,setSort}) => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.musics.page)
    const totalCountPages = useSelector(state=>state.musics.totalPage)

    const changePage = (page) => {
        dispatch(setPage(page))
    }

    return (
            <div className="body wrapper clear">
                <div className="content">
                    <div style={{display:"flex"}}>
                        <div className="search-block">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <MyInput style={{borderRadius:"50px",marginLeft:"2px"}} value={searchName} onChange={e=>search(e)} className="find-input" placeholder="Search..."/>
                            <FilterMusic applyFilter={applyFilter} checkedList={checkedList} setCheckedList={setCheckedList}/>
                        </div>
                        <SelectMusics sort={sort} onChange={(value)=>setSort(value)}/>
                    </div>
                    {musicIsLoaded ? <Loader/> : <MusicList/>
                    }
                </div>
                <Pagination defaultCurrent={page+1} onChange={(page) => changePage(page-1)}  total={totalCountPages*10} />
                <Chat/>
            </div>
    );
};

export default MusicDir;