import React, { useEffect, useRef, useState } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Message from 'components/Message/Message'

import styles from './WebSock.module.scss'
import axios from 'axios'

interface Message {
    event: 'connection' | 'message'
    username: string
    message: string
    id: number
}

const WebSock = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')
    const socket = useRef<WebSocket | null>(null)

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const sendMessage = async () => {
        const message = {
            id: Date.now(),
            username,
            message: text,
            event: 'message',
        }

        if (socket.current) socket.current.send(JSON.stringify(message))
        setText('')
    }

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now(),
            }

            if (socket.current) socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages((prev) => [...prev, message])
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    if (!connected) {
        return (
            <div className={styles.form}>
                <h3>WebSocket</h3>
                <Input
                    className={styles.input}
                    onChange={handleUsername}
                    value={username}
                    placeholder="Введите ваше имя"
                />
                <div className={styles['button-wrapper']}>
                    <Button className={styles.button} onClick={connect}>
                        Войти
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.form}>
            <h3>WebSocket</h3>
            <Input
                className={styles.input}
                onChange={handleText}
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
                    return (
                        <Message key={message.id}>
                            {message.event === 'connection' ? (
                                <p>
                                    Пользователь {message.username} подключился
                                </p>
                            ) : (
                                <p>
                                    {message.username}: {message.message}
                                </p>
                            )}
                        </Message>
                    )
                })}
            </div>
        </div>
    )
}

export default WebSock
