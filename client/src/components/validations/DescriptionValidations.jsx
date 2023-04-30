import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const DescriptionValidations = ({description}) => {
    return (
        <div>
            {(description.isDirty && description.isEmpty) && <ErrorDiv> Description is empty </ErrorDiv>}
            {(description.isDirty && description.minLength) && <ErrorDiv> Minimum length is 5 </ErrorDiv>}
            {(description.isDirty && description.maxlength) && <ErrorDiv>Maximum length is 150</ErrorDiv>}
        </div>
    );
};

export default DescriptionValidations;