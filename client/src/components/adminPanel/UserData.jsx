import React, {useEffect, useState} from 'react';
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import {Avatar, Space, Table, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, findUsers, getRoles, getUserProfile, getUsers} from "../../actions/user";
import {NavLink, useNavigate} from "react-router-dom";
import FindLogo from "../../assets/Union.svg";
import MyInput from "../UI/input/MyInput";
import {searchRecommendMusic} from "../../actions/musics";
import {setPage} from "../../reducers/musicReducer";
import moment from "moment";
import {API_URL} from "../../config";



const UserData = () => {
    const users = useSelector(state => state.user.users).map((user)=>{
        return {
            key:user._id,
            avatar:user.avatar,
            nickname:user.nickname,
            email:user.email,
            dateRegistered:moment(user.dateRegistered).format('MM/D/YYYY'),
            roles:user.roles
        }
    });
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch()
    const page = useSelector(state => state.musics.page)
    const [limit,setLimit] = useState(6)

    useEffect(()=>{
        dispatch(getUsers(limit,page))
    },[page])

    function search(e) {
        setSearchName(e.target.value)
        dispatch(findUsers(e.target.value))
    }

    return (
        <div style={{width:1000,marginLeft:"15%",marginTop:"40px"}}>
            <img width={20} height={20} src={FindLogo} alt="Search"/>
            <MyInput style={{borderRadius:"50px",marginLeft:"2px"}} value={searchName} onChange={e=>search(e)} className="find-input" placeholder="Search..."/>
            <Table dataSource={users} style={{marginTop:10}}>
                <Column title="Avatar" dataIndex="avatar" key="avatar"  render={(_, record)=>(
                    <Space size="middle">
                        { record.avatar ?
                        <Avatar className="header__avatar" src={API_URL+record.avatar} size={52}/>
                        :
                        <Avatar className="header__avatar" size={52}> {record.nickname.charAt(0).toUpperCase()} </Avatar>
                        }
                    </Space>
                )
                } />
                <Column title="Nickname" dataIndex="nickname" key="nickname" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Date registered" dataIndex="dateRegistered" key="dateRegistered" />
                <Column
                    title="Roles"
                    dataIndex="roles"
                    key="roles"
                    render={(tags) => (
                        <>
                            {tags.map((tag) => {
                                let color = "blue"
                                if(tag==="ADMIN"){
                                    color = "red"
                                }
                                if(tag === "COMPOSITOR"){
                                    color = "orange"
                                }
                                if(tag === "SUPPORT"){
                                    color = "yellow"
                                }
                                return (<Tag color={color} key={tag} style={{marginTop:5}}>
                                    {tag}
                                </Tag>)
                            })}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <NavLink onClick={()=> {
                                dispatch(getUserProfile(record.key))
                                dispatch(setPage(0))
                            }} to={( `/profile/${ record.key }` )}> Profile </NavLink>
                            <NavLink onClick={()=>{
                                dispatch(getUserProfile(record.key))
                                dispatch(getRoles())
                            }} to={( `/editProfile/${ record.key }` ) }> Edit </NavLink>
                            <a onClick={()=>{dispatch(deleteUser(record.key))}}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};

export default UserData;