import axios from "axios";
import {getGenres} from "../reducers/genreReducer";

export function getAllGenres() {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/genres` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch(getGenres(response.data))
        } catch ( e ) {
            console.log(e)
        }
    }
}