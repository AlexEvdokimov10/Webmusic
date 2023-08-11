import React, {useEffect, useState} from 'react';
import "./chat.css"
import {CloseOutlined, PhoneOutlined, SendOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, subscribe} from "../../actions/message";
import moment from "moment/moment";

const Chat = () => {
    const messages = useSelector((state) => state.message.messages)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()


    function send(event) {
        event.preventDefault()
        dispatch(sendMessage(message))
    }

    const [hiddenChat, setHiddenChat] = useState(true)
    return (
        <>
            <a onClick={() => {
                setHiddenChat(!hiddenChat)
            }} className="btn chat-circle">
                <PhoneOutlined style={{fontSize: 45}}/>
                <div className="chat-overlay"></div>
            </a>
            <div hidden={hiddenChat} className="chat-box">
                <div className="chat-box-header">
                    Support chat
                    <span className="chat-box-toggle"><CloseOutlined size={40} onClick={() => {
                        setHiddenChat(!hiddenChat)
                    }}/></span>
                </div>
                <div className="chat-box-body">
                    <div className="chat-box-overlay">
                        {messages?.map((message) => {
                            return <div>
                                <div className="cm-msg-text">
                                    <div>
                                        {message.author.nickname}
                                    </div>
                                    <div style={{marginTop:10}}>{message.message.text}</div>
                                    <span style={{marginLeft:"70%"}}>{moment(message?.date).format('MM/D/YYYY')}</span>
                                </div>
                            </div>
                        })
                        }
                    </div>
                    <div className="chat-logs">
                    </div>
                </div>
                <div className="chat-input">
                    <form>
                        <input type="text" className="chat-input" onChange={(event) => setMessage(event.target.value)}
                               placeholder="Send a message..."/>
                        <button type="submit" className="chat-submit" onClick={(event) => {
                            (send(event))
                        }}><SendOutlined
                            style={{fontSize: 30, color: "black"}}/></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chat;