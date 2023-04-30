import React , {useState} from 'react';
import moment from "moment";
import styles from "./musicprogress.module.css"


const MusicProgress = ({left,right,onChange}) => {
    return (
        <div className={styles.div_progress}>
            <input className={styles.music__progress} style={{backgroundSize:(left-0)*100/(right-0) + '% 100%'}} min={0} max={right} value={left} onChange={onChange} type="range" />
            <div style={{marginLeft:10}}>{moment(left*1000).format("mm:ss")}/{moment(right*1000).format("mm:ss")}</div>
        </div>
    );
};

export default MusicProgress;