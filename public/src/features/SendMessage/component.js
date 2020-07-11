import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from '../GroupSidebar/duck'

const SendMessage = () => {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.signUp.id)
    const channelId = useSelector(state => state.groupSidebar.activeChannel)

    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newMessage = {
            text: message,
            userId: userId,
            likes: 0,
            likers: [{}],
            channelId: channelId
        }
        await dispatch(sendMessage(newMessage))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={message} placeholder="Send a message!" onChange={e => setMessage(e.target.value)} />
            </form>
        </>
    )
}

export default SendMessage