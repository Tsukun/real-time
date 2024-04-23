import React, { useEffect, useState } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Message from 'components/Message/Message'

import styles from './EventSource.module.scss'
import axios from 'axios'

interface Message {
    message: string
    id: number
}

const EventSourcing = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: text,
            id: Date.now(),
        })
    }

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages((prev) => [...prev, message])
        }
    }

    return (
        <div className={styles.form}>
            <h3>Event Sourcing</h3>
            <Input
                className={styles.input}
                onChange={handleOnChange}
                value={text}
                placeholder="Сообщение"
            />
            <div className={styles['button-wrapper']}>
                <Button className={styles.button} onClick={sendMessage}>
                    Отправить
                </Button>
            </div>
            <div className={styles['message-container']}>
                {messages.map((message) => {
                    return <Message key={message.id}>{message.message}</Message>
                })}
            </div>
        </div>
    )
}

export default EventSourcing
