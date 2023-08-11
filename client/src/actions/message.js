import axios from "axios";
import {addMessage} from "../reducers/messageReducer";

export function sendMessage(message){
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/messages/sendMessage', {
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            subscribe()
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

export function subscribe(){
    return async dispatch =>{
        try {
            const response = await axios.get('http://localhost:5000/api/messages/getMessage',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(addMessage(response.data))
           await subscribe()
            console.log(response.data)
        } catch (e) {
            await setTimeout(()=>{
                 subscribe()
            },500)
        }
    }
}