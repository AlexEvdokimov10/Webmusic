import React , {useEffect} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {getComments} from "../../actions/comments";
import Comment from "./Comment";

const Comments = ({id}) => {
    const comments = useSelector(state=>state.comments.comments)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getComments(id))
    },[])

    return (
        <div>
            <div style={{fontSize:"18px", }}>
                {comments.length} comments
            </div>
            <div>
                {comments.map((comment)=> <Comment key={comment.id} comment={comment}/>)}
            </div>
        </div>
    );
};

export default Comments;