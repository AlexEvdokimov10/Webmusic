import React from 'react';
import Player from "../player/Player";
import {useSelector} from "react-redux";
import styles from "./bottombar.module.css"
import logotype from "../../assets/musiclab_logo.svg"

const BottomBar = () => {
    const isAuth = useSelector( state => state.user.isAuth)
    return (
        <div>
            <div className={styles.bottom__text}>
                <img width={70} height={60} src={logotype} />
                © 2023 MusicLab.com - it's music site for listening, uploading and downloading music.<br/>
                If you are noname , you can become famous lyric and your music will be heard by everyone
            </div>
            {isAuth && <Player/>}
        </div>
    );
};

export default BottomBar;