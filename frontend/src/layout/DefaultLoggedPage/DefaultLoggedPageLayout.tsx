import { useState } from 'react'
import * as S from './DefaultLoggedPageLayout.styles'
import {
  Barn,
  Cat,
  PawPrint,
  PencilSimple,
  SignOut,
  User,
} from '@phosphor-icons/react'

enum MenuItemsEnum {
  AVAILABLE_ANIMALS = 'AVAILABLE_ANIMALS',
  ADD_ANIMAL = 'ADD_ANIMAL',
  MY_ANIMALS = 'MY_ANIMALS',
  EDIT_USER_DATA = 'EDIT_USER_DATA',
}

export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemsEnum>(
    MenuItemsEnum.AVAILABLE_ANIMALS,
  )

  const handleMenuItemClick = (menuItem: MenuItemsEnum) => {
    setActiveMenuItem(menuItem)
  }

  return (
    <S.Wrapper>
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          <span>Nome do usuário</span>
        </S.UserInfo>
        <S.MenuItem
          isActive={activeMenuItem === MenuItemsEnum.AVAILABLE_ANIMALS}
          onClick={() => handleMenuItemClick(MenuItemsEnum.AVAILABLE_ANIMALS)}
        >
          <Cat size={24} />
          <span>Animais disponíveis para adoção</span>
        </S.MenuItem>
        <S.MenuItem
          isActive={activeMenuItem === MenuItemsEnum.ADD_ANIMAL}
          onClick={() => handleMenuItemClick(MenuItemsEnum.ADD_ANIMAL)}
        >
          <PawPrint size={24} />
          <span>Disponibilizar animal para adoção</span>
        </S.MenuItem>
        <S.MenuItem
          isActive={activeMenuItem === MenuItemsEnum.MY_ANIMALS}
          onClick={() => handleMenuItemClick(MenuItemsEnum.MY_ANIMALS)}
        >
          <Barn size={24} />
          <span>Meus animais disponíveis para adoção</span>
        </S.MenuItem>
        <S.MenuItem
          isActive={activeMenuItem === MenuItemsEnum.EDIT_USER_DATA}
          onClick={() => handleMenuItemClick(MenuItemsEnum.EDIT_USER_DATA)}
        >
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
