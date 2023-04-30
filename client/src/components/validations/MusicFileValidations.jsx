import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const MusicFileValidations = ({fileMusic}) => {
    return (
        <div style={ { marginTop: 10 } }>
            { (
                    fileMusic.isDirty && fileMusic.isEmpty) &&
                <ErrorDiv style={ { textAlign: "left" } }> You didn't choose file !!! </ErrorDiv> }
        </div>
    );
};

export default MusicFileValidations;