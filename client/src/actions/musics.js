import axios from "axios";
import {addMusic , deleteMusicAction , getAuthor , getMusic , setMusics , updateMusic} from "../reducers/musicReducer";
import {setActiveAuthor , setActiveMusic , setLink , setPlay} from "../reducers/playerReducer";
import {getPageCount} from "../utils/page";
import {setTotalPage} from "../reducers/pageReducer";

export function getMusics( sort , limit, page ) {
    return async dispatch => {
        try {
            let url = `http://localhost:5000/api/musics`
            if (sort) {
                url = `http://localhost:5000/api/musics?sort=${ sort }`
            }
            const response = await axios.get ( url , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`
                } ,
                params:{
                    limit:limit,
                    page:page,
                }
            } )
            dispatch ( setMusics ( response.data.musics ) )
            dispatch(setTotalPage(getPageCount(response.data.total,limit)))
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export function uploadMusic( musicFile , musicImage, musicGenres , musicName , musicDescription ) {
    return async dispatch => {
        try {
            const formDataMusic = new FormData ()
            formDataMusic.append ( 'music' , musicFile )
            formDataMusic.append ( 'image' , musicImage )
            formDataMusic.append("genres",musicGenres)
            formDataMusic.append ( "name" , musicName )
            formDataMusic.append ( "description" , musicDescription )

            const response = await axios.post ( 'http://localhost:5000/api/musics/upload' , formDataMusic,{
                headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` }
            } );

            dispatch ( addMusic ( response.data ) )


        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}


export function deleteMusic( file ) {
    return async dispatch => {
        try {
            const response = await axios.delete ( `http://localhost:5000/api/musics?id=${ file._id }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( deleteMusicAction ( file._id ) )
            console.log ( response.status )

        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export async function downloadMusic( music ) {
    try {
        const response = await fetch ( `http://localhost:5000/api/musics/download?id=${ music._id }` , {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
            }
        } )
        if (response.status === 200) {
            const blob = await response.blob ();
            const downloadUrl = window.URL.createObjectURL ( blob );
            const link = document.createElement ( 'a' );
            link.href = downloadUrl
            link.download = music.name
            document.body.appendChild ( link )
            link.click ()
            link.remove ()
        }

    } catch ( e ) {
        alert ( e.response.data.message )
    }
}

export function playCurrentMusic( music ) {
    return async dispatch => {
        try {
            const response = await fetch ( `http://localhost:5000/api/musics/play?id=${ music._id }` , {
                headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` }
            } )
            const blob = await response.blob ();
            const downloadUrl = window.URL.createObjectURL ( blob );
            dispatch ( setLink ( downloadUrl ) )
        } catch ( e ) {
            console.log ( e )
        }
    }
}

export function searchMusics( search , page , limit ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/search?search=${ search }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                } ,
                params:{
                    limit:limit,
                    page:page,
                }
            } )
            dispatch ( setMusics ( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }

}


export function getCurrentMusic( id ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/musicPage/${ id }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( getMusic ( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function getAuthorByMusic( music ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/getAuthor?author=${ music.author }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( getAuthor ( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function setActiveAuthorByMusic( music ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/getAuthor?author=${ music.author }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( setActiveAuthor ( response.data ) )
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function like ( music ) {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/like?id=${ music._id }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch(updateMusic(response.data))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function getRecommendMusics(page,limit){
    return async dispatch =>{
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/recommends` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                },
                params:{
                    limit:limit,
                    page:page,
                }
            } )
            dispatch(setMusics(response.data.musics))
            dispatch(setTotalPage(getPageCount(response.data.total,limit)))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}

export function searchRecommendMusic(search,page,limit){
    return async dispatch =>{
        try {
            const response = await axios.get ( `http://localhost:5000/api/musics/recommends?search=${search}` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                } ,
                params:{
                    limit:limit,
                    page:page,
                }
            } )
            dispatch(setMusics(response.data))
        } catch ( e ) {
            alert ( e.response.data.message )
        }
    }
}




