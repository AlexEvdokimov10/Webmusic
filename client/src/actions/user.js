import axios from "axios"
import {setUser  , editUserAction} from "../reducers/userReducer";
import {API_URL} from "../config";
import {getAuthor} from "../reducers/musicReducer";
import {getError , getSuccess} from "../reducers/messageReducer";


export const registration = (nickname,email,password)=>{
    return async dispatch => {
        try {
            const response = await axios.post ( `http://localhost:5000/api/auth/registration` , {
                nickname ,
                email ,
                password
            } )
            console.log(response.data)
            dispatch(getSuccess("Account was registered"))
        } catch ( e ) {
            dispatch ( getError ( "We can't register this user. Check input data." ) )
        }
    }
}
export const login = (email,password) => {
    return async dispatch => {
        try {
            const response = await axios.post (`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',response.data.token)
        } catch (e) {
            dispatch(getError("Email or password doesn't match"))
        }
    }
}
export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/auth/auth` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                }
            } )
            dispatch ( setUser ( response.data.user ) )
            localStorage.setItem ( 'token' , response.data.token )
        } catch (e) {
            localStorage.removeItem("token")
        }
    }
}
export const editUser = ( nickname, email) => {
    {
        return async dispatch => {
            try {
                const response = await axios.patch ( `http://localhost:5000/api/auth/edit-user` , {nickname,email} ,
                    {headers: {Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`}}
                )
                dispatch ( editUserAction( response.data) )
            } catch (e) {
                alert ( e.response.data.message )
            }
        }
    }
}


export const uploadAvatar = (file) => {
    {
        return async dispatch => {
            try {
                const formData=new FormData()
                formData.append('file',file)
                const response = await axios.post ( `${API_URL}api/auth/avatar` , formData,
                    {headers: {Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`}}
                )
                dispatch ( setUser ( response.data ) )
            } catch (e) {
                alert ( e.response.data.message )
            }
        }
    }
}

export const deleteAvatar = () => {
    {
        return async dispatch => {
            try {
                const response = await axios.delete ( `${API_URL}api/auth/avatar` ,
                    {headers: {Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }`}}
                )
                dispatch ( setUser ( response.data ) )
            } catch (e) {
                alert ( e.response.data.message )
            }
        }
    }
}

