import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getRecommendMusics, searchMusicsProfile,
    searchRecommendMusic
} from "../../../actions/musics";
import {setPage} from "../../../reducers/musicReducer";
import MusicDir from "../MusicDir";
import {useFetching} from "../../../hooks/useFetching";


const Recommends = () => {
    const genres = useSelector(state => state.genre.genres).map((genre) => {
        return genre.value
    })
    const [sort, setSort] = useState("name")
    const [searchName, setSearchName] = useState('')
    const page = useSelector(state => state.musics.page)
    const [limit, setLimit] = useState(6)
    const [checkedList, setCheckedList] = useState(genres);

    const dispatch = useDispatch()

    const [fetchMusics,musicsIsLoaded] = useFetching( async ()=> {
        dispatch(getRecommendMusics(sort,page, limit, checkedList))
        }
    )

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        dispatch(searchRecommendMusic(e.target.value, page, limit, checkedList))
    }

    function applyFilter(){
        fetchMusics()
    }

    useEffect(() => {
        if(searchName.length<1) {
            fetchMusics()
        }
    }, [page,sort])

    useEffect(()=>{
        if(searchName.length>0) {
            dispatch(searchRecommendMusic(searchName, page, limit, checkedList))
        }
    },[sort,page])

    const changePage = (page) => {
        dispatch(setPage(page))
    }

    return (
        <div className="body wrapper clear">
            <h1>Recommends</h1>
            <MusicDir applyFilter={applyFilter} sort={sort}  checkedList={checkedList} setCheckedList={setCheckedList} setSort={setSort}
                      searchName={searchName} search={searchChangeHandler}/>
        </div>

    );
};

export default Recommends;