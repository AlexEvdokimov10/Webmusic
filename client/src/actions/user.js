import axios from "axios"
import {
    setUser ,
    editUserAction ,
    setTotalPage ,
    getListUsers ,
    getOneUser ,
    editUserData ,
    deleteUserData
} from "../reducers/userReducer";
import {API_URL} from "../config";
import {getError , getSuccess} from "../reducers/errorReducer";
import {setRoles} from "../reducers/roleReducer";
import {getAllGenres} from "./genres";


export const registration = ( nickname , email , password ) => {
    return async dispatch => {
        try {
            const response = await axios.post ( `http://localhost:5000/api/auth/registration` , {
                nickname ,
                email ,
                password
            } )
            console.log ( response.data )
            dispatch ( getSuccess ( "Account was registered" ) )
        } catch ( e ) {
            dispatch ( getError ( "We can't register this user. Check input data." ) )
        }
    }
}

export const sendToRestorePasswd = ( email ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/auth/restorePasswd` , { params: { email: email } } )
            dispatch ( getSuccess ( response.data.message ) )
        } catch ( e ) {
            dispatch ( getError ( "This email doesn't exist or is not actually" ) )
        }
    }
}

export const sendToRestoreEmail = ( email ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/auth/restoreEmail` , { params: { email: email } } )
            dispatch ( getSuccess ( response.data.message ) )
        } catch ( e ) {
            dispatch ( getError ( "This email doesn't exist or is not actually" ) )
        }
    }
}
export const login = ( email , password , navigate ) => {
    return async dispatch => {
        try {
            const response = await axios.post ( `http://localhost:5000/api/auth/login` , {
                email ,
                password
            } )
            dispatch ( setUser ( response.data.user ) )
            localStorage.setItem ( 'token' , response.data.token )
            dispatch(getAllGenres())
            navigate("/home")
        } catch ( e ) {
            dispatch ( getError ( "Email or password doesn't match" ) )
        }

    }
}

export const changePasswd = ( restoreLink , password ) => {
    return async dispatch => {
        try {
            const response = await axios.patch ( `http://localhost:5000/api/auth/changePassword/${ restoreLink }` , {
                password
            } )
            dispatch ( getSuccess ( response.data.message ) )
        } catch ( e ) {
            dispatch ( getError ( e.response.data.message ) )
        }
    }
}

export const changeEmail = ( restoreLink , email ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `http://localhost:5000/api/auth/changeEmail/${ restoreLink }` , {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem ( "token" ) }`
                },
                params:{
                    email:email
                }
            } )
            dispatch ( getSuccess ( response.data.message ) )
        } catch ( e ) {
            dispatch ( getError ( e.response.data.message ) )
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
            dispatch(getAllGenres())
        } catch ( e ) {
            localStorage.removeItem ( "token" )
        }
    }
}
export const editUser = ( nickname ) => {
    {
        return async dispatch => {
            try {
                const response = await axios.patch ( `http://localhost:5000/api/auth/edit-user` , { nickname } ,
                    { headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } }
                )
                dispatch ( editUserAction ( response.data ) )
            } catch ( e ) {
                alert ( e.response.data.message )
            }
        }
    }
}


export const uploadAvatar = ( file ) => {
    {
        return async dispatch => {
            try {
                const formData = new FormData ()
                formData.append ( 'file' , file )
                const response = await axios.post ( `${ API_URL }api/auth/avatar` , formData ,
                    { headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } }
                )
                dispatch ( setUser ( response.data ) )
            } catch ( e ) {
                alert ( e.response.data.message )
            }
        }
    }
}

export const deleteAvatar = () => {
    {
        return async dispatch => {
            try {
                const response = await axios.delete ( `${ API_URL }api/auth/avatar` ,
                    { headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } }
                )
                dispatch ( setUser ( response.data ) )
            } catch ( e ) {
                alert ( e.response.data.message )
            }
        }
    }
}
export const getUsers = ( limit , page ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `${ API_URL }api/auth/adminPanel/users` ,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } ,
                    params: {
                        limit: limit ,
                        page: page ,
                    }
                }
            )
            dispatch ( getListUsers ( response.data.users ) )
            dispatch ( setTotalPage ( response.data.total ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export const findUsers = ( searchName ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `${ API_URL }api/auth/adminPanel/users/finds` ,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } ,
                    params: {
                        name: searchName
                    }
                }
            )
            dispatch ( getListUsers ( response.data.users ) )
            dispatch ( setTotalPage ( response.data.total ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export const getRoles = () => {
    return async dispatch => {
        try {
            const response = await axios.get ( `${ API_URL }api/roles` ,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } ,
                }
            )
            dispatch ( setRoles ( response.data ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export const getUserProfile = ( id ) => {
    return async dispatch => {
        try {
            const response = await axios.get ( `${ API_URL }api/auth/users/profile/${ id }` ,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } ,
                }
            )
            console.log ( response.data )
            dispatch ( getOneUser ( response.data ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export const editUserProfile = ( id , nickname , email , roles ) => {
    return async dispatch => {
        try {
            const response = await axios.patch ( `${ API_URL }api/auth/edit-data/${ id }` , {
                    nickname , email , roles
                } ,
                {
                    headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } ,
                }
            )
            dispatch ( editUserData ( response.data ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

export const deleteUser = ( id ) => {
    return async dispatch => {
        try {
            const response = await axios.delete ( `${ API_URL }api/auth/deleteUser/${ id }` , { headers: { Authorization: `Bearer ${ localStorage.getItem ( 'token' ) }` } } )
            console.log ( response.data )
            dispatch ( deleteUserData ( id ) )
        } catch ( e ) {
            console.log ( e.response.data.message )
        }
    }
}

