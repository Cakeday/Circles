import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserGroups, getChannelsOfGroup } from "./duck";

import ChannelSection from "../ChannelSection/component";

const GroupSidebar = () => {

    const groupsOfUser = useSelector(state => state.groupSidebar.groupsWithChannels)
    console.log(groupsOfUser)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserGroups())
    }, [groupsOfUser._id, dispatch])


    return (
        <>
            <ul>
                {groupsOfUser.map(group => (
                    <li key={group._id}>
                        <button onClick={() => dispatch(getChannelsOfGroup({channels: group.channels}))}>{group.name}</button>
                    </li>
                ))}
            </ul>
            <ChannelSection />
        </>
    )
}

export default GroupSidebar