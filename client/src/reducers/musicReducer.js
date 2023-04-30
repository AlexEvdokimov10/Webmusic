const SET_MUSICS="SET_MUSICS"
const ADD_MUSIC="ADD_MUSIC"
const DELETE_MUSIC = "DELETE_MUSIC"
const GET_MUSIC = "GET_MUSIC"
const GET_AUTHOR = "GET_AUTHOR"
const UPDATE_MUSIC = "UPDATE_MUSIC"

const defaultState = {
    musics:[],
    currentMusic:{},
    currentAuthor:{},
}
export default function musicReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_MUSICS : return {...state,musics: action.payload}
        case GET_AUTHOR: return {...state,currentAuthor: action.payload}
        case ADD_MUSIC: return {...state, musics: [...state.musics, action.payload]}
        case GET_MUSIC: return {...state, currentMusic: action.payload}
        case UPDATE_MUSIC: return {...state,musics: [...state.musics.map((music)=>
                music._id === action.payload._id ? music = action.payload : music)]}
        case DELETE_MUSIC: return {...state,musics:[...state.musics.filter(music=>music._id!==action.payload)]}
        default:
            return state
    }
}
export const setMusics = (musics)=>({type:SET_MUSICS,payload:musics})
export const getMusic = (music)=>({type:GET_MUSIC,payload:music})
export const getAuthor = (author)=>({type:GET_AUTHOR,payload:author})

export const addMusic = (music)=>({type:ADD_MUSIC,payload: music})

export const updateMusic = (music) =>({type:UPDATE_MUSIC,payload:music})
export const deleteMusicAction = (musicId)=>({type:DELETE_MUSIC,payload:musicId})