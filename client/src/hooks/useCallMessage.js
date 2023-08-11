import {useEffect} from "react";
import {getError , getSuccess} from "../reducers/errorReducer";
import {useDispatch} from "react-redux";


export const useCallMessage = (errorMessage, successMessage, messageApi, dispatch) =>{
    useEffect(()=>{
        console.log("message")
        if(successMessage.length>0){
            messageApi.open ( {
                type: "success" ,
                content: successMessage
            } )
            dispatch(getSuccess(""))
        }
        else if(errorMessage.length>0) {
            messageApi.open ( {
                type: "error" ,
                content: errorMessage
            } )
            dispatch(getError(""))
        }
    },[errorMessage,successMessage])
}