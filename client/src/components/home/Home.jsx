import React, {useEffect, useMemo, useState} from 'react';
import MusicDir from "../MusicDir/MusicDir";
import {useDispatch, useSelector} from "react-redux";
import {getMusics, getProfileMusic, searchMusics} from "../../actions/musics";
import {getPlaylists} from "../../actions/playlist";
import {useFetching} from "../../hooks/useFetching";

const Home = () => {
    const genres = useSelector ( state => state.genre.genres ).map((genre)=>{
        return genre.value
    })
    const genreValue= useSelector ( state => state.genre.genres )


    const [sort,setSort]=useState("name")
    const [searchName,setSearchName] = useState('')
    const page = useSelector(state => state.musics.page)
    const [limit,setLimit] = useState(6)
    const [checkedList, setCheckedList] = useState([]);
    const dispatch = useDispatch()
    const [fetchMusics,musicsIsLoaded] = useFetching( async ()=> {
            dispatch(getMusics(sort, limit, page, checkedList))
        }
    )


    useEffect(()=>{
        if(searchName.length<1) {
            fetchMusics()
        }
        dispatch(getPlaylists())
    },[sort,page,checkedList])
    useEffect(()=>{
        if(searchName.length>0) {
            dispatch(searchMusics(searchName, sort, page, limit, checkedList))
        }
    },[sort,page])

    useEffect(()=>{
        setCheckedList(genres)
    },[genreValue])


    function searchChangeHandler( e ) {
        setSearchName(e.target.value)
        dispatch(searchMusics(e.target.value,sort,page,limit,checkedList))
    }

    function applyFilter(){
        fetchMusics()
    }
    return (
        <div>
            <h1 style={{marginLeft:250,marginTop:20}}>My directory</h1>
            <MusicDir applyFilter={applyFilter} search={searchChangeHandler} musicIsLoaded={musicsIsLoaded} searchName={searchName} sort={sort} checkedList={checkedList} setCheckedList={setCheckedList} setSort={setSort}/>
        </div>
    );
};

export default Home;