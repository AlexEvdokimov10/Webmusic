import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const GenreValidations = ({}) => {
    return (
        <div>
            <div>
                {(description.isDirty && description.isEmpty) && <ErrorDiv> Description is empty </ErrorDiv>}
                {(description.isDirty && description.minLength) && <ErrorDiv> Minimum length is 5 </ErrorDiv>}
                {(description.isDirty && description.maxlength) && <ErrorDiv>Maximum length is 150</ErrorDiv>}
            </div>
        </div>
    );
};

export default GenreValidations;