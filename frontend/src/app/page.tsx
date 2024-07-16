'use client'

import { Button } from '@/components/Button'
import * as S from './styles'
import { Header } from '@/components/Header'
import { AnimalCard } from '@/components/AnimalCard'
import { mockAnimals } from '@/mocks/animals'

export default function Home() {
  return (
    <S.Wrapper>
      <Header />

      <S.Content>
        <S.TitleWrapper>
          <h1>Animais disponíveis para adoção</h1>
          <Button>Filtrar</Button>
        </S.TitleWrapper>
        <S.AnimalsListWrapper>
          {mockAnimals.map((animal) => (
            <AnimalCard key={animal.id} {...animal} />
          ))}
        </S.AnimalsListWrapper>
      </S.Content>
    </S.Wrapper>
  )
}
