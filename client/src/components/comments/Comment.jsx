import React from 'react';
import styles from "./comment.module.css"
import {API_URL} from "../../config";
import {Avatar} from "antd";

const Comment = ( { comment } ) => {
    const avatar = API_URL + comment.authorAvatar

    return (
        <div style={{display:"flex"}}>
            {avatar ?
                <Avatar src={avatar} size={52} />
                :
                <Avatar size={52}> {comment.authorName.charAt(0).toUpperCase()} </Avatar>
            }
            <div>
                <div className={ styles.comment__author }> { comment.authorName } </div>
                <div className={ styles.comment }>{ comment.text }</div>
            </div>
        </div>
    );
};

export default Comment;