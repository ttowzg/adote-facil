import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from './PasswordInput.styles'

interface InputProps {
  fieldName: 'password' | 'confirmPassword'
  zodRegister: (fieldName: InputProps['fieldName']) => object
}

export function PasswordInput({ fieldName, zodRegister }: InputProps) {
  const [inputType, setInputType] = useState('password')

  const handleChangeInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <S.Wrapper>
      <input type={inputType} {...zodRegister(fieldName)} />
      <button onClick={handleChangeInputType}>
        {inputType === 'password' ? <Eye /> : <EyeSlash />}
      </button>
    </S.Wrapper>
  )
}
