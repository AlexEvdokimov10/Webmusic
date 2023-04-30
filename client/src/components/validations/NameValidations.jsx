import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const NameValidations = ({name}) => {
    return (
        <div style={{marginTop:10}}>
            {(name.isDirty && name.isEmpty) && <ErrorDiv style={{textAlign:"left"}}> Name is empty !!! </ErrorDiv>}
            {(name.isDirty && name.minLength) && <ErrorDiv style={{textAlign:"left"}}> Name minimum length is 1 !!! </ErrorDiv>}
            {(name.isDirty && name.maxlength) && <ErrorDiv style={{textAlign:"left"}}> Name maximum length is 15 !!!  </ErrorDiv>}
        </div>
    );
};

export default NameValidations;