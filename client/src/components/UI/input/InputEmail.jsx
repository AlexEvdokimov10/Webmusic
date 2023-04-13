import React from 'react';

const InputEmail = (props) => {



    return (
        <input onBlur={ event => props.onBlur ( event ) } name={ props.name }
               onChange={ ( event ) => props.setValue ( event.target.value ) } value={ props.value } type={ props.type }
               placeholder={ props.placeholder }/>
    );
}
export default InputEmail;