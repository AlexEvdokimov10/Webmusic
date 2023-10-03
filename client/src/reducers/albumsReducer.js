const SET_ALBUMS = "SET_ALBUMS"
const ADD_ALBUMS ="ADD_ALBUMS"
const SET_PLAYED_ALBUM = "SET_PLAYED_ALBUM"
const SET_CURRENT_ALBUM = "SET_CURRENT_ALBUM"
const GET_PLAYED_MUSICS = "GET_PLAYED_MUSICS"
const GET_CURRENT_MUSICS = "GET_CURRENT_MUSICS"
const SET_INDEX = "SET_INDEX"

const defaultState = {
    albums:[],
    currentAlbum:{},
    playedAlbum:{},
    currentAlbumMusics:[],
    albumPlayedMusics:[],
    songIndex:0,
}

export default function albumReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_ALBUMS: return {...state,albums: action.payload}
        case SET_CURRENT_ALBUM: return {...state, currentAlbum: action.payload}
        case SET_PLAYED_ALBUM: return {...state, playedAlbum: action.payload}
        case GET_PLAYED_MUSICS:return {...state,albumMusics: action.payload}
        case ADD_ALBUMS: return {...state,albums: [...state.albums, action.payload]}
        case SET_INDEX: return {...state,songIndex: action.payload}
        default:
            return state
    }
}

export const setAlbums = (albums) => ({type:SET_ALBUMS,payload:albums})
export const addAlbums = (album) => ({type:SET_ALBUMS,payload:album})
export const getPlayedMusics= (musics)=>({type:GET_PLAYED_MUSICS,payload:musics})

export const getCurrentMusics= (musics)=>({type:GET_CURRENT_MUSICS,payload:musics})
export const setSongIndex=(index)=>({type:SET_INDEX,payload:index})
export const setPlayedAlbum=(album)=>({type:SET_PLAYED_ALBUM,payload:album})