const GET_GENRES = "GET_GENRES"

const defaultState = {
    genres:[]
}

export default function genreReducer(state=defaultState, action) {
    switch (action.type) {
        case GET_GENRES: return {...state,genres: action.payload}
        default:
            return state
    }
}
export const getGenres = (genres) => ({type:GET_GENRES,payload:genres})
