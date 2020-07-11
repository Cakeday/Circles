import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserGroups, setActiveGroup } from "./duck";

import styles from './component.module.css'

const GroupSidebar = () => {

    const groupsOfUser = useSelector(state => state.groupSidebar.groupsWithChannels)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserGroups())
    }, [groupsOfUser._id, dispatch])


    return (
        <>
            <ul className={styles.container}>
                {groupsOfUser.map(group => (
                    <li key={group._id}>
                        <button className={styles.button} onClick={() => dispatch(setActiveGroup({group: group}))}>{group.name}</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default GroupSidebar