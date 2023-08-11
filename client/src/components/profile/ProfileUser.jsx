import React, {useEffect, useMemo, useState} from 'react';
import {Avatar} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../../config";
import styles from "./profileUser.module.css"
import MusicDir from "../MusicDir/MusicDir";
import {getProfileMusic, searchMusics, searchMusicsProfile} from "../../actions/musics";
import {useParams} from "react-router-dom";
import {getUserProfile} from "../../actions/user";
import compositorIcon from "../../assets/plastinca.png"


const ProfileUser = () => {
    const genres = useSelector(state => state.genre.genres).map((genre) => {
        return genre.value
    })

    const params = useParams()
    const profileUser = useSelector(state => state.user.currentProfile)
    const [sort, setSort] = useState("name")
    const [searchName, setSearchName] = useState('')
    const page = useSelector(state => state.musics.page)
    const [limit, setLimit] = useState(6)
    const [checkedList, setCheckedList] = useState(genres);
    const isCompositor = profileUser.roles?.includes("COMPOSITOR")
    const [avatar,setAvatar] = useState('')

    const dispatch = useDispatch()


    useEffect(()=>{
        if(profileUser) {
            setAvatar(API_URL + profileUser.avatar)
        }
    },[profileUser])

    useEffect(()=>{
        if(searchName.length<1) {
            console.log(params.id)
            dispatch(getProfileMusic(params.id, sort, limit, page, checkedList))
        }
    },[profileUser,page])

    function applyFilter() {
        dispatch(getProfileMusic(params.id, sort, limit, page, checkedList))
    }

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        dispatch(searchMusicsProfile(params.id, e.target.value, sort, page, limit, checkedList))
    }

    useEffect(()=>{
        if(searchName.length>0) {
            dispatch(searchMusicsProfile(params.id, searchName, sort, page, limit, checkedList))
        }
    },[sort,page])

    return (
        <div>
            <header style={{height: 150, marginLeft: "13%",display:"flex"}}>
                {profileUser?.avatar ?
                    <Avatar className={styles.avatar} src={avatar} size={80}/>
                    :
                    <Avatar className={styles.avatar}
                            size={80}> {profileUser?.nickname?.charAt(0).toUpperCase()}
                    </Avatar>

                }
                <div style={{fontSize: 25, fontWeight: "bold",marginTop:40}}>
                {profileUser?.nickname}
                    {isCompositor &&
                        <div>
                            <img style={{height: 40}} src={compositorIcon}/>
                        </div>
                    }
            </div>

            </header>
            <MusicDir applyFilter={applyFilter} search={searchChangeHandler} setCheckedList={setCheckedList}
                      checkedList={checkedList} sort={sort} setSort={setSort} searchName={searchName}/>
        </div>
    );
};

export default ProfileUser;