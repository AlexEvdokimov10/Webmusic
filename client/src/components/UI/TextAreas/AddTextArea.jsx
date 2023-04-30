import React from 'react';
import classes from './AddTextArea.module.css'

const AddTextArea = ( props) => {
    return (
       <textarea className={classes.addTextArea} {...props}/>
    );
};

export default AddTextArea;