import React from 'react'
import LongPulling from './ui/LongPulling/LongPulling'
import styles from './ChatPage.module.scss'

const ChatPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <LongPulling />
            </div>
        </div>
    )
}

export default ChatPage
