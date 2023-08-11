import React from 'react';
import styles from "../uploaders/uploadPage.module.css";
import {Option} from "antd/es/mentions";
import {Select , Space} from "antd";
import {useSelector} from "react-redux";

const SelectGenre = ({onChange}) => {
    const options = useSelector(state=>state.genre.genres).map((genre)=>{
        return {
            label:genre.value,
            value:genre.value
        }
    })
    return (
        <Select onChange={onChange} options={options} optionLabelProp="label" mode="multiple" style={{width:"150px", marginTop:10}}
                defaultValue={ [] }
                placeholder="select genre"/>
    );
};

export default SelectGenre;