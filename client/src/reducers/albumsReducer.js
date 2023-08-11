const SET_ALBUMS = "SET_ALBUMS"
const ADD_ALBUMS ="ADD_ALBUMS"
const SET_CURRENT_ALBUM = "SET_CURRENT_ALBUM"
const GET_MUSICS = "GET_MUSICS"
const SET_INDEX = "SET_INDEX"

const defaultState = {
    albums:[],
    currentAlbums:{},
    albumMusics:[],
    songIndex:0,
}

export default function albumReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_ALBUMS: return {...state,albums: action.payload}
        case SET_CURRENT_ALBUM: return {...state, currentAlbums: action.payload}
        case GET_MUSICS:return {...state,albumMusics: action.payload}
        case ADD_ALBUMS: return {...state,albums: [...state.albums, action.payload]}
        case SET_INDEX: return {...state,songIndex: action.payload}
        default:
            return state
    }
}

export const setAlbums = (albums) => ({type:SET_ALBUMS,payload:albums})
export const addAlbums = (album) => ({type:SET_ALBUMS,payload:album})
export const getMusics= (musics)=>({type:GET_MUSICS,payload:musics})
export const setSongIndex=(index)=>({type:SET_INDEX,payload:index})
export const setCurrentAlbum=(album)=>({type:SET_CURRENT_ALBUM,payload:album})