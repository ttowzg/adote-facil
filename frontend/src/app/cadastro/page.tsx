'use client'

import { FormEvent } from 'react'
import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'

import * as S from './styles'
import Image from 'next/image'
import logo from '../../assets/logo-big.png'

// TODO validar campos antes do submit e exibir mensagens caso hajam erros
export default function Page() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Image src={logo} alt="Logo" width={145} height={40} />
      </S.Header>
      <S.Aside>
        <Image src={logo} alt="Logo" width={145} height={40} />
      </S.Aside>
      <S.Content>
        <S.RegisterForm onSubmit={handleSubmit}>
          <h1>Preencha seus dados para se cadastrar em nossa plataforma</h1>
          <S.RegisterFormInputsWrapper>
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
          </S.RegisterFormInputsWrapper>

          <S.RegisterFormButtonWrapper>
            <Button type="submit">Cadastrar</Button>
          </S.RegisterFormButtonWrapper>
        </S.RegisterForm>
        <S.RegisterFormFooter>
          <span>
            Já possui uma conta? <a href="/login">Faça login</a>
          </span>
        </S.RegisterFormFooter>
      </S.Content>
    </S.Wrapper>
  )
}
