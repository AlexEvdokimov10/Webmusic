import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const NicknameValidations = ({nickname}) => {
    return (
        <div>
            {(nickname.isDirty && nickname.isEmpty) && <ErrorDiv> Nickname is empty </ErrorDiv>}
            {(nickname.isDirty && nickname.minLength) && <ErrorDiv> Minimum length is 6 </ErrorDiv>}
        </div>
    );
};

export default NicknameValidations;