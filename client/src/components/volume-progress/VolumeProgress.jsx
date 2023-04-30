import React from 'react';
import styles from "./volumeprogress.module.css"

const VolumeProgress = ({left,right,onChange}) => {
    return (
        <div className={styles.div_progress}>
            <input style={{backgroundSize:(left-0)*100/(right-0) + '% 100%'}} className={styles.volume__progress}
                   min={0} max={right} value={left} onChange={onChange} type="range"/>
            <div>{left}/{right}</div>
        </div>
    );
};

export default VolumeProgress;