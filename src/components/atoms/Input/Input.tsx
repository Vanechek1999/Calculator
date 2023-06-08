import { ChangeEvent, useState, useEffect } from "react";

import classNames from 'classnames/dedupe'

import './Input.scss'

type InputProps = {
  type?: string,
  className?: string
  warning?: boolean
  placeholder?: string
  value?: string
  id?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({className, value, warning, type = "text", id, placeholder, onChange, ...rest}: InputProps) => {
  const classes = classNames(className ,'Input', {
    "Input-Warning": warning
  })
  return (
    <input
      value={value}
      className={classes}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      id={id}
      {...rest}
    />
  );
};

export default Input;
