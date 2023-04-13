import axios from "axios";
import {addMusic , deleteMusicAction , playMusic , setMusics} from "../reducers/musicReducer";

export function getMusics(sort){
    return async dispatch =>{
        try {
            let url = `http://localhost:5000/api/musics`
            if(sort){
                url = `http://localhost:5000/api/musics?sort=${sort}`
            }
            const response = await axios.get(url,{headers:{
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
export function deleteMusic(file){
    return async dispatch=>{
        try {
            const response  = await axios.delete(`http://localhost:5000/api/musics?id=${file._id}`, {
                headers : {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(deleteMusicAction(file._id))
            console.log(response.data.message)

        }catch (e){
            alert(e.response.data.message)
        }
    }
}
export async function downloadMusic(music){
        try {
            const response  = await fetch(`http://localhost:5000/api/musics/download?id=${music._id}`, {
                headers : {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.status===200){
                const blob=await response.blob();
                const downloadUrl=window.URL.createObjectURL(blob);
                const link=document.createElement('a');
                link.href=downloadUrl
                link.download=music.name
                document.body.appendChild(link)
                link.click()
                link.remove()
            }

        }catch (e){
            alert(e.response.data.message)
        }
}

export function getMusic ( music ) {
    return async dispatch => {
        try {
            const response = await fetch ( `http://localhost:5000/api/musics/get-music?id=${music._id}` , {
                headers: {Authorization: `Bearer ${localStorage.getItem ( 'token' )}`}
            } )
            const blob = await response.blob ();
            const downloadUrl = window.URL.createObjectURL ( blob );
            dispatch ( playMusic ( downloadUrl ) )
        } catch ( e ) {
            console.log ( e )
        }
    }
}
    export function searchMusics(search){
        return async dispatch=>{
            try {
                const response  = await axios.get(`http://localhost:5000/api/musics/search?search=${search}`, {
                    headers : {
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                dispatch(setMusics(response.data))

            }catch (e){
                alert(e.response.data.message)
            }
        }

}


