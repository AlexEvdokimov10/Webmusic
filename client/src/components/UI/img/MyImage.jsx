import React from 'react';
import classes from "./MyImage.module.css"

const MyImage = ({...props}) => {
    return (
        <img className={classes.btn} {...props} alt="icon"/>
    );
};

export default MyImage;