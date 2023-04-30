import React , {useEffect , useState} from 'react';
import FindLogo from "../../../assets/Union.svg";
import MyInput from "../../UI/input/MyInput";
import SelectMusics from "../../selectMusics/SelectMusics";
import {NavLink} from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons";
import MusicList from "../MusicList/MusicList";
import {useDispatch , useSelector} from "react-redux";
import {getRecommendMusics , searchMusics , searchRecommendMusic} from "../../../actions/musics";
import {Pagination} from "antd";
import {setPage} from "../../../reducers/pageReducer";

const Recommends = () => {
    const [sort,setSort]=useState("name")
    const [searchName,setSearchName] = useState('')
    const dispatch = useDispatch()
    const page = useSelector(state => state.page.page)
    const totalCountPages = useSelector(state=>state.page.totalPage)
    const [limit,setLimit] = useState(6)

    function searchChangeHandler( e ) {
        setSearchName(e.target.value)
        dispatch(searchRecommendMusic(e.target.value))
    }

    useEffect(()=>{
        dispatch(getRecommendMusics(page,limit))
    },[page])

    const changePage = (page) => {
        dispatch(setPage(page))
    }

    return (
        <div className="disk">
            <div className="body wrapper clear">
                <div className="content">
                    <h1>Recommends</h1>
                    <div style={{display:"flex"}}>
                        <div className="search-block">
                            <img width={20} height={20} src={FindLogo} alt="Search"/>
                            <MyInput style={{borderRadius:"50px",marginLeft:"2px"}} value={searchName} onChange={e=>searchChangeHandler(e)} className="find-input" placeholder="Search..."/>
                        </div>
                        <SelectMusics sort={sort} onChange={(e)=>setSort(e.target.value)}/>
                    </div>
                    <MusicList/>
                </div>
                <Pagination defaultCurrent={page+1} onChange={(page) => changePage(page-1)}  total={totalCountPages*10} />
            </div>
        </div>
    );
};

export default Recommends;