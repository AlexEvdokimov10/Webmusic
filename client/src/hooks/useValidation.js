import {useEffect , useState} from "react";

export const useValidation = (value,validations) => {
    const [isEmpty,setIsEmpty]=useState(true)
    const [minLength,setMinLength] = useState(false)
    const [maxLength,setMaxLength] = useState(false)
    const [emailError,setEmailError]=useState(false)
    const [inputIsValid,setInputIsValid]=useState(false)

    useEffect(()=>{
        for (const validation in validations){
            switch (validation){
                case "minlength":
                    value.length<validations[validation] ? setMinLength(true) : setMinLength(false)
                    break;
                case "maxlength":
                    value.length>validations[validation] ? setMaxLength(true) : setMaxLength(false)
                    break;
                case "isEmpty":
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case "isEmail":
                    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    regex.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
            }
        }
    },[value])


    useEffect(()=>{
        if(isEmpty || minLength || maxLength || emailError){
            setInputIsValid(false)
        } else {
            setInputIsValid(true)
        }
    },[isEmpty,minLength,maxLength,emailError])
    return {
        isEmpty,
        minLength,
        maxLength,
        emailError,
        inputIsValid
    }
}