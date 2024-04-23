import React, { ReactNode } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
    className?: string
    children: ReactNode
    onClick: () => void
}

const Button = (props: ButtonProps) => {
    const { className, children, onClick } = props
    return (
        <button
            className={classNames(className, styles.button)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
