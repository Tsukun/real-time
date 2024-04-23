import React, { useEffect, useState } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Message from 'components/Message/Message'

import styles from './LongPulling.module.scss'
import axios from 'axios'

interface Message {
    message: string
    id: number
}

const LongPulling = () => {
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
        try {
            const { data } = await axios.get<Message>(
                'http://localhost:5000/get-messages'
            )

            setMessages((prev) => [...prev, data])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    return (
        <div className={styles.form}>
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
            <div>
                {messages.map((message) => {
                    return <Message key={message.id}>{message.message}</Message>
                })}
            </div>
        </div>
    )
}

export default LongPulling
