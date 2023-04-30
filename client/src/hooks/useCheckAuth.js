import {useEffect} from "react";
import {getError , getSuccess} from "../reducers/messageReducer";
import {useDispatch} from "react-redux";


export const useCheckAuth = (errorMessage,successMessage,messageApi,dispatch) =>{
    useEffect(()=>{
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