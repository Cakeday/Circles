import React from 'react'
import GroupSidebar from '../GroupSidebar/component'
import ChannelSection from '../ChannelSection/component'
import ChatSection from '../ChatSection/component'
import SendMessage from '../SendMessage/component'

import styles from './component.module.css'

const Main = (props) => {

    return (
        <div className={styles.main}>
            <GroupSidebar />
            <ChannelSection />
            <ChatSection />
            <SendMessage />
        </div>
    )
}

export default Main