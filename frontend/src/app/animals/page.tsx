'use client'

import { Button } from '@/components/Button'
import { AnimalCard } from '@/components/AnimalCard'
import { EmptyAnimals } from '@/components/EmptyAnimals'

import { mockAnimals } from '@/mocks/animals'
import * as S from './styles'
import { useMemo } from 'react'

export default function Animals() {
  useMemo(() => {
    // TODO fix error localStorage not defined
    localStorage.setItem('available-animals', JSON.stringify(mockAnimals))
  }, [])

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Animais disponíveis para adoção</h1>
        {!!mockAnimals.length && <Button>Filtrar</Button>}
      </S.TitleWrapper>
      {mockAnimals.length ? (
        <S.AnimalsListWrapper>
          {mockAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              listType="animals-available-to-adopt"
            />
          ))}
        </S.AnimalsListWrapper>
      ) : (
        <EmptyAnimals />
      )}
    </S.Wrapper>
  )
}
