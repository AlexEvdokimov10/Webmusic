const GET_ROLES = "GET_ROLES"

const defaultState = {
    roles:[]
}

export default function roleReducer(state=defaultState, action) {
    switch (action.type) {
        case GET_ROLES: return {...state,roles: action.payload}
        default:
            return state
    }
}
export const setRoles = (roles) => ({type:GET_ROLES,payload:roles})