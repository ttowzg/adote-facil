'use client'

import { Button } from '@/components/Button'
import * as S from './styles'
import { FormEvent } from 'react'

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
              <input type="password" />
            </label>
            <label>
              Confirme a senha
              <input type="password" />
            </label>
          </S.LoginFormInputsWrapper>
          <Button type="submit" text="Cadastrar" />
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
