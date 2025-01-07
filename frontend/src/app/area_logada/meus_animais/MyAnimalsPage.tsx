'use client'

import { Header } from '@/components/Header'
import * as S from './MyAnimalsPage.styles'
import { mockAnimals } from '@/mocks/animals'
import { AnimalCard } from '@/components/AnimalCard'
import { EmptyAnimals } from '@/components/EmptyAnimals'

export default function MyAnimalsPage() {
  return (
    <S.Wrapper>
      <Header />

      <S.Content>
        <S.TitleWrapper>
          <h1>Meus animais disponíveis para adoção</h1>
        </S.TitleWrapper>
        {mockAnimals.length ? (
          <S.AnimalsListWrapper>
            {mockAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                listType="my-animals"
              />
            ))}
          </S.AnimalsListWrapper>
        ) : (
          <EmptyAnimals />
        )}
      </S.Content>
    </S.Wrapper>
  )
}
