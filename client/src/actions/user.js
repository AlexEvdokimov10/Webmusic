import axios from "axios"
import {setUser  , editUserAction} from "../reducers/userReducer";
import {API_URL} from "../config";


export const registration = async (nickname,email,password)=>{
    try {
        const response = await axios.post (`http://localhost:5000/api/auth/registration`, {nickname, email, password})
        alert(response.data.message)
    } catch (e){
        console.log(e)
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
            console.log (e)
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
            console.log ( e )
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
                console.log(response.data.message)
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