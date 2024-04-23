import React from 'react'
import LongPulling from './ui/LongPulling/LongPulling'
import EventSourcing from './ui/EventSource/EventSourcing'
import styles from './ChatPage.module.scss'
import WebSock from './ui/WebSocket/WebSock'

const ChatPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {/* <LongPulling /> */}
                <WebSock />
            </div>
        </div>
    )
}

export default ChatPage
