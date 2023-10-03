import axios from "axios";
import {addAlbums, getPlayedMusics, setAlbums, setPlayedAlbum} from "../reducers/albumsReducer";

export function createAlbums(albumName,albumImage,genres,musics){
    return async dispatch =>{
        const formDataAlbum = new FormData ()
        formDataAlbum.append ( "albumName" , albumName )
        formDataAlbum.append("image",albumImage)
        formDataAlbum.append("genres",genres)
        musics.map((music)=>{
            formDataAlbum.append("musics",music.file,music.name)
        })
        const response = await axios.post ( `http://localhost:5000/api/albums/create` ,formDataAlbum ,{
            headers: {
                Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
            }
        } )
        dispatch(addAlbums(response.data))

    }
}

export function getAlbums(limit){
    return async dispatch =>{
        const response = await axios.get ( `http://localhost:5000/api/albums`  ,{
            headers: {
                Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
            },
            params:{
                limit:limit
            }
        } )
        dispatch(setAlbums(response.data))
    }
}


export function getMusicsByAlbum(id){
    return async dispatch =>{
        const response = await axios.get ( `http://localhost:5000/api/albums/musics`  ,{
            headers: {
                Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
            },
            params:{
                id:id
            }
        } )
        dispatch(getPlayedMusics(response.data))
    }
}