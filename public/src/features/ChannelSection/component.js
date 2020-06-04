import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ChannelSection = (props) => {
    const dispatch = useDispatch()
    const channels = useSelector(state => state.groupSidebar.channelsOfGroup)
    console.log(channels)
    
    return (
        <ul>
            {channels !== [] && channels.map(channel => (
                <li key={channel._id}>{channel.title}</li>
            ))}
        </ul>
    )
}

export default ChannelSection
