import React, {useEffect, useState} from 'react';
import UploaderMusic from "./UploaderMusic";
import {useDispatch, useSelector} from "react-redux";
import MyInput from "../UI/input/MyInput";
import styles from "./uploadPage.module.css"
import AddButton from "../UI/buttons/AddButton";
import musicLogo from "../../assets/sound-music-logo.png";
import AddTextArea from "../UI/TextAreas/AddTextArea";
import {uploadMusic} from "../../actions/musics";
import {useInput} from "../../hooks/useInput";
import NameValidations from "../validations/NameValidations";
import DescriptionValidations from "../validations/DescriptionValidations";
import MusicFileValidations from "../validations/MusicFileValidations";
import SelectGenre from "../selectMusics/SelectGenre";
import {getError, getSuccess} from "../../reducers/errorReducer";
import {message} from "antd";
import {useCallMessage} from "../../hooks/useCallMessage";


const UploaderPage = () => {
    const dispatch = useDispatch ()
    const name = useInput ( "" , { isEmpty: true , minLength: 1 } )
    const description = useInput ( "" , { isEmpty: true , minLength: 10 } )
    const fileMusic = useInput ( null , { isEmpty: true } )
    const genres = useInput([],{isEmpty:true})
    const [fileImage , setFileImage] = useState ()
    const [imageMusic , setImageMusic] = useState ()
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = useSelector(state => state.error.successMessage)
    const errorMessage = useSelector(state=> state.error.error)

    useCallMessage(errorMessage,successMessage,messageApi,dispatch)

    function musicUploadHandler( event ) {
        fileMusic.setValue ( ...event.target.files )
    }

    const checkInvalid = () => {
        return ! name.inputIsValid ||
            ! description.inputIsValid ||
            ! fileMusic.inputIsValid
    }


    function uploadImage( e ) {
        let file = e.target.files[0]
        let reader = new FileReader ()
        reader.readAsDataURL ( file )
        reader.onload = () => {
            setImageMusic ( reader.result )
        };
        setFileImage ( file )
        reader.onerror = function ( error ) {
            console.log ( 'Error: ' , error );
        }
    }

    const chooseGenre = (value) => {
        genres.setValue({...genres,value})
    };


    function addMusic() {
        dispatch ( uploadMusic ( fileMusic.value , fileImage, genres.value.value , name.value , description.value ) )
        name.setValue ( "" )
        description.setValue ( "" )
        setImageMusic ( null )
        setFileImage ( null )
        fileMusic.setValue ( null )
    }

    return (
        <div style={ { marginLeft: "250px" } }>
            {contextHolder}
            <div className={ styles.div__uploader }>
                <UploaderMusic accept=".png, .jpg, .jpeg" nameUploaders={ "Upload image" }
                               onChange={ ( event ) => uploadImage ( event ) }/>
                <img className={ styles.img__music }
                     src={ imageMusic ? imageMusic : musicLogo }/>
            </div>
            <div>
                <MyInput onBlur={ e => name.onBlur ( e ) } className={ styles.name } multiple={ true }
                         value={ name.value }
                         onChange={ ( e ) => name.setValue ( e.target.value ) }
                         placeholder="Input name..."/>
                <NameValidations name={ name }/>
            </div>
            <div style={ { marginTop: 10 } }>
                <SelectGenre onChange={chooseGenre}/>
            </div>
            <div className={ styles.div__description }>
                <div>
                    Add description
                </div>
                <AddTextArea onBlur={ e => description.onBlur ( e ) } className={ styles.textarea }
                             value={ description.value } onChange={ ( e ) => description.setValue ( e.target.value ) }
                             placeholder="Write description..."/>
                <DescriptionValidations description={ description }/>
            </div>
            <UploaderMusic accept=".mp3, .wma, .mp2, .amr "
                           nameUploaders={ "Upload music" }
                           onChange={ ( event ) => musicUploadHandler ( event ) }/>
            {fileMusic?.value?.name}
            <MusicFileValidations fileMusic={ fileMusic }/>
            <AddButton disabled={ checkInvalid () } onClick={ addMusic }>
                Add music
            </AddButton>
        </div>
    );
};

export default UploaderPage;