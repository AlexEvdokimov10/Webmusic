import {useMemo} from "react";

export const usePagination = (totalCountPages) => {
    const pagination = useMemo(()=> {
        let pagesArray = []
        for (let i = 0; i < totalCountPages; i++) {
            pagesArray.push ( i + 1 )
        }
        return pagesArray
    },[totalCountPages])
    return pagination
}