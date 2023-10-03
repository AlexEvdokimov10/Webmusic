import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetching} from "../../hooks/useFetching";
import {getMusics} from "../../actions/musics";

const Album = () => {
    const genres = useSelector ( state => state.genre.genres ).map((genre)=>{
        return genre.value
    })
    const currentAlbum = useSelector(state => state.album.currentAlbum)
    const dispatch = useDispatch()
    const [sort,setSort]=useState("name")
    const [searchName,setSearchName] = useState('')
    const page = useSelector(state => state.musics.page)
    const [limit,setLimit] = useState(6)
    const [checkedList, setCheckedList] = useState(genres);
    const [fetchMusics,musicsIsLoaded] = useFetching( async ()=> {
            dispatch(getMusics(sort, limit, page, checkedList))
        }
    )

    return (
        <div>
            
        </div>
    );
};

export default Album;