import music from "../components/MusicDir/MusicList/Music/Music";

const SET_MUSICS="SET_MUSICS"
const ADD_MUSIC="ADD_MUSIC"

const defaultState = {
    musics:[]
}
export default function musicReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_MUSICS : return {...state,musics: action.payload}
        case ADD_MUSIC: return {...state, musics: [...state.musics, action.payload]}
        default:
            return state
    }
}
export const setMusics = (musics)=>({type:SET_MUSICS,payload:musics})
export const addMusic = (music)=>({type:ADD_MUSIC,payload: music})
