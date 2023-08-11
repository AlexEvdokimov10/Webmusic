const SEND_MESSAGE = "SEND_MESSAGE"

const defaultState = {
    messages:[]
}

export default function messageReducer(state=defaultState, action) {
    switch (action.type) {
        case SEND_MESSAGE:return {...state,messages: [...state.messages,action.payload]}
        default:
            return state
    }
}

export const addMessage = (message) =>({type:SEND_MESSAGE,payload:message})
