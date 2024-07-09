'use client'

import { Button } from '@/components/Button'
import * as S from './styles'

// TODO validar campos antes do submit e exibir mensagens caso hajam erros
export default function Login() {
  const onSubmit = () => {
    console.log('login')
  }

  return (
    <S.Wrapper>
      <S.Header>
        <h1>Login</h1>
      </S.Header>
      <S.Content>
        <S.LoginFormWrapper>
          <S.LoginForm>
            <S.LoginFormRow>
              <label>Email</label>
              <S.LoginFormInput type="email" />
            </S.LoginFormRow>
            <S.LoginFormRow>
              <label>Senha</label>
              <S.LoginFormInput type="password" />
            </S.LoginFormRow>
          </S.LoginForm>
          <Button text="Login" onClick={onSubmit} />
        </S.LoginFormWrapper>
        <footer>
          <span>
            Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
          </span>
        </footer>
      </S.Content>
    </S.Wrapper>
  )
}
