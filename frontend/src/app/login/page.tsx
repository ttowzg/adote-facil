'use client'

import { Button } from '@/components/Button'
import * as S from './styles'
import { FormEvent } from 'react'

// TODO validar campos antes do submit e exibir mensagens caso hajam erros
export default function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <S.Wrapper>
      <S.Header>
        <h1>Login</h1>
      </S.Header>
      <S.Content>
        <S.LoginForm onSubmit={handleSubmit}>
          <S.LoginFormInputsWrapper>
            <label>
              Email
              <input type="email" />
            </label>
            <label>
              Senha
              <input type="password" />
            </label>
          </S.LoginFormInputsWrapper>
          <Button type="submit" text="Login" />
        </S.LoginForm>
        <footer>
          <span>
            Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
          </span>
        </footer>
      </S.Content>
    </S.Wrapper>
  )
}
