const SET_USER="SET_USER"
const EDIT_USER="EDIT_USER"
const SET_MESSAGE = "SET_MESSAGE"
const LOG_OUT="LOG_OUT"

const defaultState={
    currentUser:{},
    isAuth:false,
}
export default function userReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case EDIT_USER:
            return {
                ...state,
                currentUser:action.payload
            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            }
        default:
            return state
    }
}
export const setUser = user =>({type:SET_USER, payload:user})
export const editUserAction = user =>({type:EDIT_USER, payload:user})
export const logout = () => ({type:LOG_OUT})