'use client'

import { Header } from '@/components/Header'

import * as S from './styles'
import { AnimalForm } from '@/components/AnimalForm'

export default function Animal() {
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        <S.TitleWrapper>
          <h1>Cadastrar animal para adoção</h1>
        </S.TitleWrapper>

        <AnimalForm location="page" />
      </S.Content>
    </S.Wrapper>
  )
}
