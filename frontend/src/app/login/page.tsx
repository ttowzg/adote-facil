'use client'

import { FormEvent } from 'react'
import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'

import * as S from './styles'

// TODO validar campos antes do submit e exibir mensagens caso hajam erros
export default function Page() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <S.Wrapper>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.LoginFormInputsWrapper>
          <label>
            Email
            <input type="email" />
          </label>
          <label>
            Senha
            <PasswordInput />
          </label>
        </S.LoginFormInputsWrapper>
        <Button type="submit">Login</Button>
      </S.LoginForm>
      <footer>
        <span>
          Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
        </span>
      </footer>
    </S.Wrapper>
  )
}
