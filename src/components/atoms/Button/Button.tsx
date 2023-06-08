import classNames from 'classnames/dedupe'

import Paper from '../Paper/Paper'

import './Button.scss'
import { ReactNode } from 'react'

type Space = {
  desktop?: number
  mobile?: number
  all?: number
}

type ButtonProps = {
  children: ReactNode
  className?:  string
  type?: "button" | "submit" | "reset" 
  color?: string
  backGround?: string
  xSpace?: Space
  ySpace?: Space
  textSize?: number
  disabled?: boolean
  fullWidth?: boolean;
  warning?: boolean
  onClick?: () => void
}

const Button = ({
  children,
  className,
  type = 'button',
  color,
  xSpace,
  ySpace,
  backGround,
  disabled,
  fullWidth,
  warning,
  onClick,
}: ButtonProps) => {
  const classes = classNames(className, 'Button', {
    [`Button_color_${color}`]: color,
    [`Button_backGround_${backGround}`]: backGround,
    'Button_warning': warning,
    'Button_fullWidth': fullWidth,
  })

  return (
    <button disabled={disabled} className={classes} type={type} onClick={onClick}>
      <Paper top={ySpace} right={xSpace} bottom={ySpace} left={xSpace}>
        {children}
      </Paper>
    </button>
  )
}

export default Button
