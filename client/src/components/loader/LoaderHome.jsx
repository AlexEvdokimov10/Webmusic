import React, {useEffect} from 'react';
import Home from "../home/Home";
import {getAllGenres} from "../../actions/genres";
import {useDispatch} from "react-redux";

const LoaderHome = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllGenres())
    },[])
    return (
        <></>
    );
};

export default LoaderHome;