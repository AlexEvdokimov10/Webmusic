import React from 'react';
import {PlusCircleOutlined} from "@ant-design/icons";
import styles from "./uploader.module.css"

const UploaderMusic = ({onBlur,onChange,nameUploaders,accept,className}) => {
    return (
        <div className={className}>
            <label style={{cursor:"pointer",fontWeight:"bold",fontSize:"20px"}}>
                <input onBlur={onBlur} accept={accept} name="file" className={styles.music__input} onChange={onChange} type="file"  />
                <PlusCircleOutlined style={{fontSize:"30px"}}/>
                <span>{nameUploaders}</span>
            </label>
        </div>
    );
};

export default UploaderMusic;