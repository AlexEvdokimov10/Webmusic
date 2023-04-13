import React from 'react';
import classes from "./errodiv.module.css"

const ErrorDiv = ({children,...props}) => {
    return (
        <div className={classes.error} {...props}>
            {children}
        </div>
    );
};

export default ErrorDiv;