import React , {useEffect , useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {API_URL} from "../../../../../config";
import {edit , getAuthorByMusic , getCurrentMusic} from "../../../../../actions/musics";
import {Input , Select} from "antd";
import {useInput} from "../../../../../hooks/useInput";
import TextArea from "antd/es/input/TextArea";
import styles from "./editMusic.module.css"
import musicLogo from "../../../../../assets/sound-music-logo.png";
import AddButton from "../../../../UI/buttons/AddButton";
import UploaderMusic from "../../../../uploaders/UploaderMusic";

const EditMusic = () => {
    const currentMusic = useSelector ( state => state.musics.currentMusic )
    const musicImg = API_URL + currentMusic?.image
    const name = useInput ( currentMusic.name , { isEmpty: true , minLength: 5 } )
    const description = useInput ( currentMusic.description , { isEmpty: true , minLength: 1 } )
    const genres = useInput ( currentMusic.genre , { isEmpty: true } )
    const imageMusic = useInput ( musicImg, { isEmpty: true } )
    const [fileImage , setFileImage] = useState ()
    const options = useSelector ( state => state.genre.genres ).map ( ( genre ) => {
        return {
            label: genre.value ,
            value: genre.value
        }
    } )

    const dispatch = useDispatch ()
    const params = useParams ()

    useEffect ( () => {
        dispatch ( getCurrentMusic ( params.id ) )
        dispatch ( getAuthorByMusic ( currentMusic ) )
    } , [] )

    function editImage( e ) {
        let file = e.target.files[0]
        let reader = new FileReader ()
        reader.readAsDataURL ( file )
        reader.onload = () => {
            imageMusic.setValue( reader.result )
        };
        setFileImage ( file )
        reader.onerror = function ( error ) {
            console.log ( 'Error: ' , error );
        }
    }

    const checkInvalid = () => {
        return ! name.inputIsValid ||
            ! description.inputIsValid
    }
    const chooseGenre = (value) => {
        genres.setValue({...genres,value})
    };

    function editMusic(){
        dispatch(edit(params.id,{
            name:name.value,
            genres:genres.value,
            description:description.value
        },fileImage))
    }


    return (
        <div className={ styles.content }>
            <div className={styles.div__uploader}>
                <UploaderMusic accept=".png, .jpg, .jpeg" nameUploaders={ "Upload image" }
                               onChange={ ( event ) => editImage( event ) }/>
                <img className={ styles.img__music }
                     src={ imageMusic.value ? imageMusic.value : musicLogo }/>
            </div>
            <h1>
                Edit music
            </h1>
            <div>
                <Input onBlur={ e => name.onBlur ( e ) } onChange={ ( e ) => name.setValue ( e.target.value ) }
                       rootClassName={ styles.name } value={ name.value }/>
            </div>
            <div style={ { width: 500 , marginTop: 10 } }>
                <Select options={ options } optionLabelProp="label" mode="multiple" style={ { width: "150px" } } onChange={chooseGenre}
                        defaultValue={ genres.value }
                        placeholder="select genre"/>
            </div>
            <div style={ { width: 400 , marginTop: 10} }>
                <TextArea onBlur={ e => description.onBlur ( e ) } value={ description.value }
                          rootClassName={ styles.textarea }
                          onChange={ e => description.onChange ( e ) }/>
            </div>
            <AddButton className={ styles.edit__button } disabled={ checkInvalid() } onClick={ ()=>editMusic() }>
                Edit music
            </AddButton>
        </div>
    );
};

export default EditMusic;