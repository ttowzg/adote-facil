import * as S from './DefaultLoggedPageLayout.styles'
import {
  Barn,
  Cat,
  PawPrint,
  PencilSimple,
  SignOut,
  User,
} from '@phosphor-icons/react'

export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <S.Wrapper>
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          <span>Nome do usuário</span>
        </S.UserInfo>
        <S.MenuItem>
          <Cat size={24} />
          <span>Animais disponíveis para adoção</span>
        </S.MenuItem>
        <S.MenuItem>
          <PawPrint size={24} />
          <span>Disponibilizar animal para adoção</span>
        </S.MenuItem>
        <S.MenuItem>
          <Barn size={24} />
          <span>Meus animais disponíveis para adoção</span>
        </S.MenuItem>
        <S.MenuItem>
          <PencilSimple size={24} />
          <span>Editar dados pessoais</span>
        </S.MenuItem>
        <S.MenuItem>
          <SignOut size={24} />
          <span>Sair</span>
        </S.MenuItem>
      </S.AsideMenu>
      <S.PageContent>{children}</S.PageContent>
    </S.Wrapper>
  )
}
