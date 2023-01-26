import axios from "axios"
import {setUser} from "../reducers/userReducer";

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