import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const PasswordValidations = ({password}) => {
    return (
        <div>
            {(password.isDirty && password.isEmpty) && <ErrorDiv> Password is empty </ErrorDiv>}
            {(password.isDirty && password.minLength) && <ErrorDiv> Minimum length is 6 </ErrorDiv>}
        </div>
    );
};

export default PasswordValidations;