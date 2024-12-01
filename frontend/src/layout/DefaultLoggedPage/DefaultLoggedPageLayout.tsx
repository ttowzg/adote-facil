'use client'

import * as S from './DefaultLoggedPageLayout.styles'
import { User } from '@phosphor-icons/react'
import { getUserData } from '@/helpers/get-user-data'
import { UserMenu } from '@/components/UserMenu/UserMenu'

export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = getUserData()

  return (
    <S.Wrapper>
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          <span>{userData?.name}</span>
        </S.UserInfo>
        <UserMenu />
      </S.AsideMenu>
      <S.PageContent>{children}</S.PageContent>
    </S.Wrapper>
  )
}
