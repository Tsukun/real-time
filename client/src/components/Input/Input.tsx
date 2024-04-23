import React, { useRef } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface InputProps {
    className?: string
    onChange: (...args: any[]) => void
    value: string
    placeholder: string
}

const Input = (props: InputProps) => {
    const { className, onChange, value, placeholder } = props
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={styles.container}>
            <input
                className={classNames(className, styles.input)}
                type="text"
                ref={inputRef}
                value={value}
                placeholder=" "
                onChange={onChange}
            />
            <span className={styles['input-placeholder']}>{placeholder}</span>
        </div>
    )
}

export default Input
