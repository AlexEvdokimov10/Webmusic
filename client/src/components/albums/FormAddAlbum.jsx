import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import styles from "./formAdd.module.css"
import {Button, Upload} from "antd";
import musicLogo from "../../assets/sound-music-logo.png";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import AddMusic from "./AddMusic";
import SelectGenre from "../selectMusics/SelectGenre";
import {useInput} from "../../hooks/useInput";
import {useDispatch} from "react-redux";
import {createAlbums} from "../../actions/albums";
import NameValidations from "../validations/NameValidations";
import UploaderMusic from "../uploaders/UploaderMusic";
import * as UUid from "uuid";

const FormAddAlbum = () => {
    const name = useInput("", {isEmpty: true, minLength: 1})
    const imageAlbum = useInput ( null , { isEmpty: true } )
    const imageFileAlbum = useInput ( null , { isEmpty: true } )
    const [uploadMusics,setUploadMusics] = useState([])
    const [musics,setMusics]=useState([])
    const genres = useInput([],{isEmpty:true})
    const dispatch = useDispatch()


    function addUploadMusic(music){
       setUploadMusics([...uploadMusics,music])
    }

    const chooseGenre = (value) => {
        genres.setValue({...genres,value})
    };

    function uploadImage( e ) {
        let file = e.target.files[0]
        let reader = new FileReader ()
        reader.readAsDataURL ( file )
        reader.onload = () => {
            imageAlbum.setValue( reader.result )
        };
        imageFileAlbum.setValue ( file )
        reader.onerror = function ( error ) {
            console.log ( 'Error: ' , error );
        }
    }

    function createAlbum() {
        dispatch(createAlbums(name.value, imageFileAlbum.value, genres.value.value,uploadMusics))
    }
    function handleChangeName(index,value){
        let data = musics;
        data[index].name = value
        setMusics(data)
    }
    function handleChangeFile(index,value){
        let data = musics;
        data[index].file = value
        console.log(data)
        setMusics(data)
    }

    function addForm(){
        setMusics([...musics,{name:"",file:null}])
    }



    return (
        <div className={styles.form__add}>
            <h1>Form adding album</h1>
            <div className={styles.body}>
                <div className={styles.image_add}>
                    <UploaderMusic accept=".png, .jpg, .jpeg" nameUploaders={ "Upload image" }
                                   onChange={ ( event ) => uploadImage ( event ) }/>
                    <img className={ styles.img__music }
                         src={ imageAlbum.value ? imageAlbum.value : musicLogo }/>
                </div>
                <MyInput onBlur={e => name.onBlur(e)} className={styles.input__form} multiple={true}
                         value={name.value}
                         onChange={(e) => name.setValue(e.target.value)}
                         placeholder="Input name..."/>
                <NameValidations name={name}/>
            </div>
            <SelectGenre  onChange={chooseGenre}/>
            <div style={{cursor:"pointer",marginTop:"10px",fontSize:20}}>
                <PlusOutlined onClick={(e)=>{addForm(e)}} />
                {musics?.map((music,index)=>{
                    const key = UUid.v4()
                    return <div key={key}>
                        <AddMusic music={music}  index={index} addMusic={addUploadMusic}
                                  handleChangeName={handleChangeName} handleChangeFile={handleChangeFile} />
                    </div>
                })}
            </div>
            <div>
                <Button onClick={()=>createAlbum()} className={styles.submit__button}> Create </Button>
            </div>

        </div>
    );
};

export default FormAddAlbum;