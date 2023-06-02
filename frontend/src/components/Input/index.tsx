import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { InputContainer, Error } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  error: FieldError | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { placeholder, error, type, ...rest },
  ref,
) => {
  return (
    <>
      <InputContainer
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...rest}
        isErrored={!!error}
      />
      {!!error && <Error>{error.message}</Error>}
    </>
  )
}

const Input = forwardRef(InputBase)

export default Input
