const GET_ERROR = "GET_ERROR"
const GET_SUCCESS ="GET_SUCCESS"

const defaultState = {
    successMessage:"",
    error:""
}

export default function messageReducer( state=defaultState, action) {
    switch (action.type) {
        case GET_ERROR: return {...state,error: action.payload}
        case GET_SUCCESS: return {...state,successMessage: action.payload}
        default:
            return state
    }
}

export const getError = (error) => ({type:GET_ERROR,payload:error})
export const getSuccess = (success) => ({type:GET_SUCCESS,payload:success})