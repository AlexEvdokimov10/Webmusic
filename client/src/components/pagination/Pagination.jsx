import React from 'react';
import {usePagination} from "../../hooks/usePagination";
import styles from  "./pagination.module.css"

const pageCurrent = styles.page__current + " " + styles.page
const Pagination = ({totalCountPages,page,changePage}) => {
    let pagesArray = usePagination(totalCountPages)
    return (
        <div className={styles.page__wrapper}>
            {
                pagesArray.map((p) =>
                    <span onClick={()=>changePage(p-1)}
                          key={p} className={page+1 === p ? pageCurrent : styles.page}>
                                {p}
                    </span>
                )
            }
        </div>
    );
};

export default Pagination;