import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from './PasswordInput.styles'

export function PasswordInput() {
  const [inputType, setInputType] = useState('password')

  const handleChangeInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <S.Wrapper>
      <input type={inputType} />
      <button onClick={handleChangeInputType}>
        {inputType === 'password' ? <Eye /> : <EyeSlash />}
      </button>
    </S.Wrapper>
  )
}
