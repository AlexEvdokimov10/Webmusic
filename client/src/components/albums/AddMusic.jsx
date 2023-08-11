import React, {useEffect, useState} from 'react';
import {useInput} from "../../hooks/useInput";
import MyInput from "../UI/input/MyInput";
import styles from "../uploaders/uploadPage.module.css";
import NameValidations from "../validations/NameValidations";
import UploaderMusic from "../uploaders/UploaderMusic";
import MusicFileValidations from "../validations/MusicFileValidations";
import {Button} from "antd";

const AddMusic = ({music, addMusic, handleChangeName, handleChangeFile, index}) => {

    const name = useInput(music.name, {isEmpty: true, minLength: 1})
    const fileMusic = useInput(music.file, {isEmpty: true})

    function musicUploadHandler(event) {
        fileMusic.setValue(...event.target.files)
    }

    return (
        <div style={{marginTop: 10}}>
            <MyInput onBlur={e => name.onBlur(e)} className={styles.name} multiple={true}
                     value={name.value}
                     onChange={(event) => {
                         name.setValue(event.target.value)
                         handleChangeName(index, name.value)
                     }
                     }
                     placeholder="Input name..."/>
                <NameValidations name={name}/>
            <UploaderMusic accept=".mp3, .wma, .mp2, .amr "
                           nameUploaders={"Upload music"}
                           onChange={(event) => {
                               musicUploadHandler(event)
                               handleChangeFile(index, ...event.target.files)
                           }}/>
            <MusicFileValidations fileMusic={fileMusic}/>
            <Button onClick={() => {
                addMusic({name: name.value, file: fileMusic.value})
            }}> Add to album </Button>
        </div>
    );
};

export default AddMusic;