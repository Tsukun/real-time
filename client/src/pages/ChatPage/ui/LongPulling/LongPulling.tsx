import React, { useState } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import styles from './LongPulling.module.scss'

const LongPulling = () => {
    const [text, setText] = useState('')

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
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
                <Button className={styles.button} onClick={() => {}}>
                    Отправить
                </Button>
            </div>
        </div>
    )
}

export default LongPulling
