import React from 'react';
import classes from "./MyButton.module.css";
import styled from "styled-components";
import {StyleDeleteButton} from "./DeleteButton";

const StyledLogoutButton = styled(StyleDeleteButton)`
  border-width: 0;
  margin-left: 20px;
  margin-top: 20px;
`

const LogoutButton = ({children,...props}) => {
    return (
        <StyledLogoutButton {...props} >
            {children}
        </StyledLogoutButton>
    );
};

export default LogoutButton;