import React from 'react';
import ErrorDiv from "../UI/errors/ErrorDiv";

const CommentValidations = ( { comment } ) => {
    return (
        <div>
            { (comment.isDirty && comment.minLength) && <ErrorDiv> Minimum length is 1 symbol </ErrorDiv> }
        </div>
    );
};

export default CommentValidations;