import React from 'react'
import styles from './Input.module.css'

interface InputProps {
    onChange: (...args: any[]) => void
    value: string
    name?: string
}

const Input = (props: InputProps) => {
    const { onChange, value } = props
    return (
        <div>
            <input value={value}></input>
        </div>
    )
}

export default Input
