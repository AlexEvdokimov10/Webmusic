const CREATE_PLAYLIST = "CREATE_PLAYLIST"
const GET_PLAYLISTS = "GET_PLAYLISTS"
const GET_MUSICS = "GET_MUSICS"
const ADD_MUSIC = "ADD_MUSIC"
const DELETE_PLAYLIST = "DELETE_PLAYLIST"
const DELETE_MUSIC ="DELETE_MUSIC"
const OPEN_MODAL = "OPEN_MODAL"
const CLOSE_MODAL = "CLOSE_MODAL"
const SET_INDEX = "SET_INDEX"
const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST"

const defaultState = {
    currentPlaylist:{},
    playlists:[],
    playlistMusics:[],
    songIndex:0,
    isShowModal:false
}

export default function playlistReducer(state=defaultState, action) {
    switch (action.type) {
        case CREATE_PLAYLIST:return {...state, playlists: [...state.playlists, action.payload]}
        case GET_PLAYLISTS:return {...state,playlists: action.payload}
        case SET_CURRENT_PLAYLIST:return {...state,currentPlaylist: action.payload}
        case GET_MUSICS:return {...state,playlistMusics: action.payload}
        case ADD_MUSIC: return {...state, playlistMusics: [...state.playlistMusics, action.payload]}
        case DELETE_PLAYLIST:return {...state,playlists:[...state.playlists.filter(playlist=>playlist._id!==action.payload)] }
        case DELETE_MUSIC: return {...state,playlistMusics:[...state.playlistMusics.filter( music=>music._id!==action.payload)]}
        case OPEN_MODAL: return {...state,isShowModal: true}
        case CLOSE_MODAL: return {...state,isShowModal: false}
        case SET_INDEX: return {...state,songIndex: action.payload}
        default:
            return state
    }
}

export const addPlaylist = (playlist) => ({type:CREATE_PLAYLIST,payload:playlist})
export const getPlaylistsByUser =  (playlists) => ({type:GET_PLAYLISTS, payload:playlists})
export const getMusics= (musics)=>({type:GET_MUSICS,payload:musics})
export const addMusicToPlaylist = (music)=>({type:ADD_MUSIC,payload: music})
export const deleteMusicFromPlaylist=(music)=>({type:DELETE_MUSIC,payload:music._id})
export const openModal=()=>({type:OPEN_MODAL})
export const closeModal=()=>({type:CLOSE_MODAL})
export const setSongIndex=(index)=>({type:SET_INDEX,payload:index})
export const setCurrentPlaylist=(playlist)=>({type:SET_CURRENT_PLAYLIST,payload:playlist})