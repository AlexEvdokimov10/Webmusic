import React from 'react';
import AddTextArea from "../UI/TextAreas/AddTextArea";
import AddButton from "../UI/buttons/AddButton";
import {useDispatch} from "react-redux";
import {postComment} from "../../actions/comments";
import styles from "./comment-form.module.css"
import {useInput} from "../../hooks/useInput";
import CommentValidations from "../validations/CommentValidations";
import {Form} from "antd";


const CommentsForm = ({id}) => {
    const comment=useInput('',{isEmpty:true,minLength:1})
    const dispatch = useDispatch()
    const addNewComment= (e) => {
        dispatch(postComment(id,comment.value))
        comment.setValue('')
    }
    const checkInvalid = () => {
        return !comment.inputIsValid
    }

    return (
        <Form style={{marginTop:"10px"}} onFinish={(e)=>addNewComment(e)}>
            <AddTextArea onBlur={ e=>comment.onBlur(e)}  className={styles.textArea} value={comment.value} onChange={e=>comment.onChange(e)} type="text" placeholder="Comment..."/>
            <CommentValidations comment={comment}/>
            <AddButton disabled = {checkInvalid()}>Add comment</AddButton>
        </Form>
    );
};

export default CommentsForm;