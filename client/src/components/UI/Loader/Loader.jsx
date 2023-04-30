import React from 'react';
import classes from "./Loader.module.css"
import {LoadingOutlined} from "@ant-design/icons";
const Loader = () => {
    return (
        <div>
            <LoadingOutlined className={classes.loader} />
        </div>
    );
};

export default Loader;