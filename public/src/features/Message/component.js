import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from './component.module.css'

const Message = (props) => {

    if (!props.text) return

    return (
        <div className={styles}>
            <p>{props.message.poster}</p>
            <p>{props.message.text}</p>
            <p>{props.message.likers}</p>
        </div>
    )
}

export default Message