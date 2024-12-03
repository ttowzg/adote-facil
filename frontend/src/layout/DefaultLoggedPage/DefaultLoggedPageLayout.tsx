'use client'

import * as S from './DefaultLoggedPageLayout.styles'
import { ArrowLeft, List, User } from '@phosphor-icons/react'
import { getUserData } from '@/helpers/get-user-data'
import { UserMenu } from '@/components/UserMenu'
import { useState } from 'react'

// BUG se o menu mobile estiver aberto, o conteúdo da página não é renderizado, portanto se a largura da tela aumentar e o menu mobile sumir, o conteúdo da página não aparece
export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  const userData = getUserData()

  const handleChangeOpenMobileMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }
  // TODO implementar o menu mobile igual tá no figma
  // deixei aqui com o nome do usuário, mas tem que ter o botão de chat e o logo no header
  // posso colocar o mesmo aside do desktop, com o nome do usuário, e deixo o botão de chat no header
  // ou colocar o botão de chat no menu lateral, e o nome do usuário no header
  return (
    <S.Wrapper>
      <S.MobileHeader>
        <S.MobileMenu $isOpen={mobileMenuIsOpen}>
          <S.MobileMenuIconWrapper onClick={handleChangeOpenMobileMenu}>
            <ArrowLeft size={32} />
          </S.MobileMenuIconWrapper>
          <UserMenu />
        </S.MobileMenu>
        <S.MobileHeaderIconWrapper onClick={handleChangeOpenMobileMenu}>
          <List size={32} />
        </S.MobileHeaderIconWrapper>
        <S.UserInfo>
          <User size={32} />
          <span>{userData?.name}</span>
        </S.UserInfo>
      </S.MobileHeader>
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          <span>{userData?.name}</span>
        </S.UserInfo>
        <UserMenu />
      </S.AsideMenu>
      {!mobileMenuIsOpen ? <S.PageContent>{children}</S.PageContent> : null}
    </S.Wrapper>
  )
}
