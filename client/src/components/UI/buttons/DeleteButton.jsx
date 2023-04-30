import React from 'react';
import styled from "styled-components";

export const StyleDeleteButton = styled.button`
  padding:5px 15px;
  color:red;
  font-size:14px;
  background: transparent;
  border: 1px solid red;
  cursor: pointer;
  border-radius: 50px;
`

const DeleteButton = ({children,...props}) => {
    return (
        <StyleDeleteButton {...props}>
                {children}
        </StyleDeleteButton>
    );
};

export default DeleteButton;