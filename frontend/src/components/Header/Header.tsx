'use client'

import { ArrowLeft, ChatCircleDots, List } from '@phosphor-icons/react'
import Image from 'next/image'

import * as S from './Header.styles'
import logo from '../../assets/logo.png'
import { AnimalsContext } from '@/contexts/animals'
import { useContext } from 'react'

const pageTitle = {
  '/login': 'Login',
  '/register': 'Cadastro',
}

export function Header() {
  const { selectedAnimalToShowDetails } = useContext(AnimalsContext)

  const pathname =
    typeof window !== 'undefined' ? window?.location?.pathname : ''

  if (['/login', '/register'].includes(pathname)) {
    return (
      <S.LoginOrRegisterHeaderWrapper>
        <h1>{pageTitle[window.location.pathname as keyof typeof pageTitle]}</h1>
      </S.LoginOrRegisterHeaderWrapper>
    )
  }

  if (selectedAnimalToShowDetails) {
    return (
      <S.Wrapper>
        <S.IconWrapper>
          <ArrowLeft size={28} />
        </S.IconWrapper>

        <S.LogoWrapper>
          <Image src={logo} alt="Logo" layout="fill" />
        </S.LogoWrapper>

        <S.IconWrapper></S.IconWrapper>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper>
      <S.IconWrapper>
        <List size={28} />
      </S.IconWrapper>

      <S.LogoWrapper>
        <Image src={logo} alt="Logo" layout="fill" />
      </S.LogoWrapper>

      <S.IconWrapper>
        <ChatCircleDots size={28} />
      </S.IconWrapper>
    </S.Wrapper>
  )
}
