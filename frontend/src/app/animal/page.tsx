'use client'

import * as S from './styles'
import { AnimalRegisterForm } from '@/components/AnimalRegisterForm'

export default function Animal() {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Cadastrar animal para adoção</h1>
      </S.TitleWrapper>

      <AnimalRegisterForm />
    </S.Wrapper>
  )
}
