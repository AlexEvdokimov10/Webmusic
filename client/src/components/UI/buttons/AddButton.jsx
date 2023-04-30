import React from 'react';
import classes from "./MyButton.module.css"
import {Button} from "antd";


const AddButton = ({children,...props}) => {
    return (
        <Button htmlType="submit" rootClassName={classes.addBtn} {...props} >
            {children}
        </Button>
    );
};
export default AddButton;