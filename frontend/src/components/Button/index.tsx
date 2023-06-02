import React, { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, type, ...rest }: ButtonProps) {
  return (
    <ButtonContainer type={type ?? 'button'} {...rest}>
      {children}
    </ButtonContainer>
  )
}

export default Button
