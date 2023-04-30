import React from 'react';
import Select from "../UI/select/Select";
import styles from "./selectMusics.module.css"
const SelectMusics = ({sort,onChange}) => {
    return (
        <Select className={styles.sorting} value={sort} onChange={onChange}>
            <option value="name"> Name </option>
            <option value="time"> Duration </option>
            <option value="date"> Date </option>
        </Select>
    );
};

export default SelectMusics;