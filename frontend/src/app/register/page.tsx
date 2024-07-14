'use client'

import { FormEvent } from 'react'
import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'

import * as S from './styles'

// TODO validar campos antes do submit e exibir mensagens caso hajam erros
export default function Register() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <S.Wrapper>
      <S.Header>
        <h1>Cadastro</h1>
      </S.Header>
      <S.Content>
        <S.LoginForm onSubmit={handleSubmit}>
          <S.LoginFormInputsWrapper>
            <label>
              Nome
              <input type="text" />
            </label>
            <label>
              Email
              <input type="email" />
            </label>
            <label>
              Senha
              <PasswordInput />
            </label>
            <label>
              Confirme a senha
              <PasswordInput />
            </label>
          </S.LoginFormInputsWrapper>
          <Button type="submit">Cadastrar</Button>
        </S.LoginForm>
        <footer>
          <span>
            Já possui uma conta? <a href="/login">Faça login</a>
          </span>
        </footer>
      </S.Content>
    </S.Wrapper>
  )
}
