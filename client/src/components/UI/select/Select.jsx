import React from 'react';

const Select = ({children,...props}) => {
    return (
        <select className="sorting" {...props} >
            {children}
        </select>
    );
};

export default Select;