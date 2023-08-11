import axios from "axios";
import {setMusics , updateMusic} from "../reducers/musicReducer";
import {getPageCount} from "../utils/page";
import {
    addMusicToPlaylist ,
    addPlaylist ,
    deleteMusicFromPlaylist ,
    getMusics ,
    getPlaylistsByUser
} from "../reducers/playlistReducer";


export function createPlaylist(name) {
    return async dispatch =>{
        try {
            const response = await axios.post ( `http://localhost:5000/api/playlists/create` , {name:name},{
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch(addPlaylist(response.data))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function getPlaylists(){
    return async dispatch =>{
        try {
            const response = await axios.get ( `http://localhost:5000/api/playlists` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch(getPlaylistsByUser(response.data))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function getMusicsByPlaylist(playlist){
    return async dispatch =>{
        try {
            const response = await axios.get ( `http://localhost:5000/api/playlists/musics` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                },
                params:{
                    id:playlist._id
                }
            } )
            dispatch(getMusics (response.data))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}


export function addMusic(music,playlist){
    return async dispatch =>{
        try {
            const response = await axios.patch ( `http://localhost:5000/api/playlists/musics` ,{
                music:music,
                playlist:playlist
            },
                {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                },

            } )
            dispatch(updateMusic (response.data))
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export function deletePlaylist(playlist) {
    return async dispatch => {
        try {
            const response = await axios.delete ( `http://localhost:5000/api/playlists` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                } ,
                params: {
                    id: playlist._id
                }
            } )
            dispatch ( getPlaylists ( response.data ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export function deleteMusicInPlaylist(playlist,music) {
    return async dispatch => {
        try {
            const response = await axios.delete ( `http://localhost:5000/api/playlists/musics` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                } ,
                params: {
                    musicId: music._id,
                    playlistId:playlist._id
                }
            } )
            dispatch ( deleteMusicFromPlaylist( response.data ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}