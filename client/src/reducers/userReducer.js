const SET_USER="SET_USER"
const EDIT_USER="EDIT_USER"
const GET_USERS = "GET_USERS"
const GET_USER = "GET_USER"
const SET_MESSAGE = "SET_MESSAGE"
const DELETE_USER ="DELETE_USER"
const LOG_OUT="LOG_OUT"
const SET_PAGE = "SET_PAGE"
const SET_TOTAL_PAGE = "SET_TOTAL_PAGE"
const EDIT_USER_PROFILE = "EDIT_USER_PROFILE"

const defaultState={
    currentUser:{},
    users:[],
    currentProfile:{},
    isAuth:false,
    isAdmin:false,
    isSupport:false,
    isCompositor:false
}
export default function userReducer(state=defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                isSupport: action.payload.roles.includes("SUPPORT"),
                isCompositor: action.payload.roles.includes("COMPOSITOR"),
                isAdmin: action.payload.roles.includes("ADMIN")
            }
        case EDIT_USER:
            return {
                ...state,
                currentUser:action.payload
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return {
                ...state,
                currentProfile: action.payload
            }
        case DELETE_USER: return {
            ...state,users:[...state.users.filter((user)=>user._id !== action.payload)]
        }
        case EDIT_USER_PROFILE:
            return {...state,users: [...state.users.map((user)=>
                    user._id === action.payload._id ? user = action.payload : user)]}
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            }
        case SET_PAGE: return {...state,page: action.payload}
        case SET_TOTAL_PAGE : return {...state,totalPage:action.payload}
        default:
            return state
    }
}
export const setUser = user =>({type:SET_USER, payload:user})
export const editUserAction = user =>({type:EDIT_USER, payload:user})
export const editUserData = user =>({type:EDIT_USER, payload:user})
export const deleteUserData = (id) =>({type:DELETE_USER,payload:id})
export const logout = () => ({type:LOG_OUT})
export const getListUsers=(users)=>({type:GET_USERS,payload:users})
export const getOneUser=(user)=>({type:GET_USER,payload:user})
export const setPage = (page) => ({type:SET_PAGE,payload:page})
export const setTotalPage = (totalPage) => ({type:SET_TOTAL_PAGE,payload:totalPage})