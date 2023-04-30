import axios from "axios";
import {addComments , setComments} from "../reducers/commentReducer";
import {getAuthor} from "../reducers/musicReducer";


export function postComment( id,text ) {
    return async dispatch => {
        try {
            const response = await axios.post ( `http://localhost:5000/api/musics/comments?id=${ id }` , {text:text},{
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( addComments( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function getComments( id ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/comments?id=${id}` ,{
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( setComments( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

