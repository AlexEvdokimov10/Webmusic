import axios from "axios";
import {addMusic , setMusics} from "../reducers/musicReducer";

export function getMusics(){
    return async dispatch =>{
        try {
            const response = await axios.get("http://localhost:5000/api/musics",{headers:
                    {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }})
            dispatch(setMusics(response.data))
        } catch ( e ) {
            console.log(e.response.data.message)
        }
    }
}
export function uploadMusic(file){
    return async dispatch=>{
        try {
            const formData=new FormData()
            formData.append('music',file)

            console.log(formData.values())
            const response=await axios.post('http://localhost:5000/api/musics/upload',formData,{
                headers : {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addMusic(response.data))

        }catch (e){
            alert(e.response.data.message)
        }
    }
}