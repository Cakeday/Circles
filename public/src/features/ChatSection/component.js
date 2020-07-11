import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from '../ChatSection/component'

const ChatSection = () => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.groupSidebar.messagesOfChannel)

    return (
        <>
            {messages !== [] && messages.map(message => (
                <Message key={message._id} message={message} />
            ))}
        </>
    )
}

export default ChatSection