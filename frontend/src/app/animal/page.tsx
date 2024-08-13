'use client'

import { Button } from '@/components/Button'
import * as S from './styles'
import { AnimalRegisterForm } from '@/components/AnimalRegisterForm'

export default function Animal() {
  return (
    <S.Wrapper>
      <S.FormWrapper>
        <S.TitleWrapper>
          <h1>Cadastrar animal para adoção</h1>
        </S.TitleWrapper>

        <AnimalRegisterForm />
      </S.FormWrapper>

      <Button type="submit">Cadastrar</Button>
    </S.Wrapper>
  )
}
