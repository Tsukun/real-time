import React, { ReactNode } from 'react'

import styles from './Message.module.scss'

interface MessageProps {
    children: ReactNode
}

const Message = (props: MessageProps) => {
    const { children } = props
    return (
        <div className={styles.container}>
            <div className={styles.message}>{children}</div>
        </div>
    )
}

export default Message
