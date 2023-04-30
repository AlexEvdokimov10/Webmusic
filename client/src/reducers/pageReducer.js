const SET_PAGE = "SET_PAGE"
const SET_TOTAL_PAGE = "SET_TOTAL_PAGE"

const defaultState = {
    page:0,
    totalPage:0,
}

export default function pageReducer( state=defaultState, action) {
    switch (action.type) {
        case SET_PAGE: return {...state,page: action.payload}
        case SET_TOTAL_PAGE : return {...state,totalPage:action.payload}
        default:
            return state
    }
}

export const setPage = (page) => ({type:SET_PAGE,payload:page})
export const setTotalPage = (totalPage) => ({type:SET_TOTAL_PAGE,payload:totalPage})
