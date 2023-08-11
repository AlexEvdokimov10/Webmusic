import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import styles from "./filter.module.css"
import {useSelector} from "react-redux";

const CheckboxGroup = Checkbox.Group;

const FilterMusic = ({applyFilter,checkedList,setCheckedList}) => {
    const genres = useSelector ( state => state.genre.genres ).map((genre)=>{
        return genre.value
    })
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < genres.length);
        setCheckAll(list.length === genres.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? genres : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };


    return (
        <div className={styles.filter__block}>
            <button className={styles.filter__icon}>
                <FilterOutlined/>
            </button>
            <div className={styles.filter__content}>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <Divider/>
                <CheckboxGroup options={genres} value={checkedList} onChange={onChange}/>
                <div className={styles.apply__button}>
                    <Button onClick={()=>applyFilter()}>Apply filter</Button>
                </div>
            </div>
        </div>
    );
};

export default FilterMusic;