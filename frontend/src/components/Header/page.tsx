'use client'

import { ChatCircleDots, List } from '@phosphor-icons/react'
import Image from 'next/image'

import * as S from './styles'
import logo from '../../assets/logo.png'

const pageTitle = {
  '/login': 'Login',
  '/register': 'Cadastro',
}

export function Header() {
  const { pathname } = window.location

  if (['/login', '/register'].includes(pathname)) {
    return (
      <S.LoginOrRegisterHeaderWrapper>
        <h1>{pageTitle[window.location.pathname as keyof typeof pageTitle]}</h1>
      </S.LoginOrRegisterHeaderWrapper>
    )
  }

  return (
    <S.Wrapper>
      <List size={28} />
      <Image src={logo} alt="Logo" width={29} height={27} />
      <ChatCircleDots size={28} />
    </S.Wrapper>
  )
}
