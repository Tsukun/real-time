import React from 'react'

import styles from './Message.module.scss'

interface MessageProps {
    children: string
}

const Message = (props: MessageProps) => {
    const { children } = props
    return (
        <div className={styles.container}>
            <p className={styles.message}>{children}</p>
        </div>
    )
}

export default Message
