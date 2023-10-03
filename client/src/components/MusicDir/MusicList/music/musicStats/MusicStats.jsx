import React from 'react';
import likeActiveIcon from "../../../../../assets/filled-like.png";
import likeNoActiveIcon from "../../../../../assets/like_no_active.png";
import moment from "moment";
import PlaylistDropdownButton from "../../../../playlist/PlaylistDropdownButton";
import {SettingOutlined} from "@ant-design/icons";
import styles from './musicStats.module.css'
import {useNavigate} from "react-router-dom";

const MusicStats = ({likeClickHandler,isLike,music,listens,playlists}) => {
    const router = useNavigate ()
    return (
        <div className={styles.stats}>
            <img className={styles.like} src={isLike ? likeActiveIcon:likeNoActiveIcon } onClick={likeClickHandler}/>
            <span style={{marginLeft:30}}>
                        listens : {listens}
                    </span>
            <span className={styles.duration}>
                        { moment ( music?.time * 1000 ).format ( "mm:ss" ) }
                    </span>
            <span>
                        <PlaylistDropdownButton playlists={playlists}/>
                    </span>
            <span className={styles.musicDate}>
                    Upload date : { music?.date?.slice ( 0 , 10 ) }
                </span>
            <span> <SettingOutlined className={styles.musicSettings}
                                    onClick={ () => router ( `/musics/${ music?._id }` ) }/> </span>
        </div>
    );
};

export default MusicStats;