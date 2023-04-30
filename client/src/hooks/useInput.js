import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue,validation) =>{
    const [value,setValue]=useState(initialValue)
    const [isDirty,setDirty]=useState(false)
    const valid =useValidation(value,validation)

    const onChange=(e)=>{
        e.stopPropagation()
        setValue(e.target.value)
    }
    const onBlur = () =>{
        setDirty(true)
    }
    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}