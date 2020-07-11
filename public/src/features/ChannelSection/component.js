import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../GroupSidebar/duck'

import styles from "./component.module.css";

const ChannelSection = (props) => {
    const dispatch = useDispatch()
    const channels = useSelector(state => state.groupSidebar.channelsOfGroup)
    console.log("here are the channels" + JSON.stringify(channels))
    
    return (
        <ul className={styles.container}>
            {channels !== [] && channels.map(channel => (
                <li key={channel._id}>
                    <button className={styles.button} onClick={() => dispatch(setActiveChannel({channel: channel}))}>{channel.title}</button>
                </li>
            ))}
        </ul>
    )
}

export default ChannelSection
