const PLAY_MUSIC = "PLAY_MUSIC"
const PAUSE_MUSIC = "PAUSE_MUSIC"
const SET_DURATION = "SET_DURATION"
const SET_VOLUME = "SET_VOLUME"
const SET_ACTIVE = "SET_ACTIVE"
const SET_CURRENT_TIME = "SET_CURRENT_TIME"
const SET_LINK = "SET_LINK"
const SET_AUTHOR = "SET_AUTHOR"

const defaultState = {
    activeMusic:{},
    activeAuthor:{},
    volume:50,
    duration:0,
    currentTime:0,
    pause:true,
    link:"",
}
export default function playerReducer(state=defaultState, action) {
    switch (action.type){
        case SET_ACTIVE:return {...state,activeMusic: action.payload, duration: 0, currentTime: 0}
        case SET_AUTHOR:return {...state,activeAuthor: action.payload}
        case SET_CURRENT_TIME: return {...state,currentTime: action.payload}
        case SET_DURATION:return {...state,duration: action.payload}
        case SET_VOLUME:return {...state,volume: action.payload}
        case PLAY_MUSIC:return {...state,pause: false}
        case SET_LINK:return {...state, link: action.payload}
        case PAUSE_MUSIC:return {...state,pause: true}
        default:
            return state
    }
}

export const setActiveMusic=(music)=>({type:SET_ACTIVE,payload: music})
export const setActiveAuthor=(author)=>({type:SET_AUTHOR,payload: author})
export const setCurrentTime=(currentTime)=>({type:SET_CURRENT_TIME,payload: currentTime})
export const setDuration=(duration)=>({type:SET_DURATION,payload: duration})
export const setVolume=(volume)=>({type:SET_VOLUME,payload: volume})
export const setLink=(link)=>({type:SET_LINK,payload: link})
export const setPlay=()=>({type:PLAY_MUSIC})
export const setPause=()=>({type:PAUSE_MUSIC})