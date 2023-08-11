import React from 'react';
import {Select} from "antd";


const MySelect = ({children,...props}) => {
    return (
        <Select {...props} >
            {children}
        </Select>
    );
};

export default MySelect;