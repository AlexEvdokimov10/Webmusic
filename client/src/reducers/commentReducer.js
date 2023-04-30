const ADD_COMMENT = "ADD_COMMENT"
const GET_COMMENTS = "GET_COMMENT"

const defaultState = {
    comments:[]
}

export default function commentReducer(state=defaultState, action) {
    switch (action.type) {
        case GET_COMMENTS: return {...state,comments: action.payload}
        case ADD_COMMENT: return {...state,comments: [...state.comments, action.payload]}
        default:
            return state
    }
}

export const setComments = (comments) => ({type:GET_COMMENTS,payload:comments})
export const addComments = (comment) => ({type:ADD_COMMENT,payload:comment})