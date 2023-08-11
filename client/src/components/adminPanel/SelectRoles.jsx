import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {useSelector} from "react-redux";

const SelectRoles = ({roles,options,chooseRole}) => {
    const userRoles = useSelector(state => state.user.currentProfile.roles)

    return (
        <div style={ { width: 500 , marginTop: 10 } }>
            <Select options={ options } optionLabelProp="label" mode="multiple" style={ { width: "150px" } } onChange={chooseRole}
                    value={ roles.value }
                    placeholder="select roles"/>
        </div>
    );
};

export default SelectRoles;