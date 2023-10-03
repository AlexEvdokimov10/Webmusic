import React from 'react';
import FindLogo from "../../assets/Union.svg";
import MyInput from "../UI/input/MyInput";
import FilterMusic from "../filter/FilterMusic";

const SearcherMusic = ({searchName,search,applyFilter,checkedList,setCheckedList}) => {
    return (
        <div className="search-block">
            <img width={20} height={20} src={FindLogo} alt="Search"/>
            <MyInput value={searchName} onChange={e => search(e)}
                     className="find-input" placeholder="Search..."/>
            <FilterMusic applyFilter={applyFilter} checkedList={checkedList} setCheckedList={setCheckedList}/>
        </div>
    );
};

export default SearcherMusic;