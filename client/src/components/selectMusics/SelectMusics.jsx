import React from 'react';
import MySelect from "../UI/select/MySelect";
import styles from "./selectMusics.module.css"
import {Option} from "antd/es/mentions";
const SelectMusics = ({sort,onChange}) => {
    return (
        <MySelect className={styles.sorting} value={sort} onChange={onChange}>
            <Option value="name"> Name </Option>
            <Option value="time"> Duration </Option>
            <Option value="date"> Date </Option>
        </MySelect>
    );
};

export default SelectMusics;