import { ChatCircleDots, List } from '@phosphor-icons/react'
import Image from 'next/image'

import * as S from './styles'
import logo from '../../assets/logo.png'

export function Header() {
  return (
    <S.Wrapper>
      <List size={28} />
      <Image src={logo} alt="Logo" width={29} height={27} />
      <ChatCircleDots size={28} />
    </S.Wrapper>
  )
}
