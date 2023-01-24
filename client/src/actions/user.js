import axios from "axios"
export const registration = async (nickname,email,password)=>{
    try {
        const response = await axios.post (`http://localhost:5000/api/auth/registration`, {nickname, email, password})
        alert(response.data.message)


    } catch (e){
        console.log(e)
    }
    }