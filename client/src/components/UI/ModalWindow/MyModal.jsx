import React from 'react';
import classes from './MyModal.module.css'
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {closeModal} from "../../../reducers/playlistReducer";

const MyModal = ({children,open}) => {
    const dispatch = useDispatch()

    const rootClasses=[classes.myModal]

    if(open){
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')}  onClick={()=>(dispatch(closeModal()))}>
            <Modal footer={null} open={open} >
                <div className={classes.myModalContent} onClick={(e)=>e.stopPropagation()}>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default MyModal;