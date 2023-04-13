import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const EmailValidations = ({email}) => {
    return (
        <div>
            {(email.isDirty && email.isEmpty) && <ErrorDiv> Email is empty </ErrorDiv>}
            {(email.isDirty && email.minLength) && <ErrorDiv> Minimum length is 5 </ErrorDiv>}
            {(email.isDirty && email.emailError) && <ErrorDiv>This not email address</ErrorDiv>}
        </div>
    );
};

export default EmailValidations;