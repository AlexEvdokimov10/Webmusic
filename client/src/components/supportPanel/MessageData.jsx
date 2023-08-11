import React, {useEffect, useState} from 'react';
import {Space, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import {NavLink, useNavigate} from "react-router-dom";
import {deleteUser, getUsers} from "../../actions/user";
import {useDispatch, useSelector} from "react-redux";

const MessageData = () => {
    const users = useSelector(state => state.user.users).map((user)=>{
        return {
            key:user._id,
            nickname:user.nickname,
            email:user.email,
            dateRegistered:user.dateRegistered,
            roles:user.roles
        }
    });
    const dispatch = useDispatch()
    const page = useSelector(state => state.musics.page)
    const totalCountPages = useSelector(state=>state.musics.totalPage)
    const [limit,setLimit] = useState(6)

    useEffect(()=>{
        dispatch(getUsers(limit,page))
    },[page])

    return (
        <div style={{width:1000,marginLeft:"15%",marginTop:"40px"}}>
            <Table dataSource={users}>
                <Column title="Nickname" dataIndex="nickname" key="nickname" />
                <Column title="email" dataIndex="email" key="email" />
                <Column title="Date registered" dataIndex="dateRegistered" key="dateRegistered" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <NavLink to={( `/profile/${ record.key }` )}> Profile </NavLink>
                            <NavLink to={(`/chat/${record.key}`)}>Send message</NavLink>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};

export default MessageData;