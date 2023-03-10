const SET_MUSICS="SET_MUSICS"
const ADD_MUSIC="ADD_MUSIC"
const DELETE_MUSIC = "DELETE_MUSIC"

const defaultState = {
    musics:[]
}
export default function musicReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_MUSICS : return {...state,musics: action.payload}
        case ADD_MUSIC: return {...state, musics: [...state.musics, action.payload]}
        case DELETE_MUSIC: return {...state,musics:[...state.musics.filter(music=>music._id!=action.payload)]}
        default:
            return state
    }
}
export const setMusics = (musics)=>({type:SET_MUSICS,payload:musics})
export const addMusic = (music)=>({type:ADD_MUSIC,payload: music})
export const deleteMusicAction = (musicId)=>({type:DELETE_MUSIC,payload:musicId})