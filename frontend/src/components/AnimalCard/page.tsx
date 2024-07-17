import * as S from './styles'
import Image from 'next/image'
import { Button } from '../Button'
import { calculateAnimalAge } from '@/helpers/calculate-animal-age'
import { Pencil, Trash } from '@phosphor-icons/react'

interface AnimalCardProps {
  animal: {
    id: number
    type: string
    monthOfBirth?: number
    yearOfBirth?: number
    sex: 'Macho' | 'Fêmea'
    race: string
    size: 'Pequeno' | 'Médio' | 'Grande'
    images: string[]
  }
  listType: 'my-animals' | 'animals-available-to-adopt'
}

// TODO implementar carrossel de imagens
// TODO melhorar estilização da imagem pra não quebrar o layout
export function AnimalCard({ animal, listType }: AnimalCardProps) {
  const { id, type, monthOfBirth, yearOfBirth, sex, race, size, images } =
    animal

  // TODO validar se não tem uma forma melhor de fazer isso
  const animalImage = require(`../../assets/${images[0]}`)

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <Image src={animalImage} alt="Animal" />
      </S.ImageWrapper>
      <S.Content>
        <S.AnimalInfo>
          <span>Tipo: {type}</span>
          <span>
            Idade: {calculateAnimalAge({ monthOfBirth, yearOfBirth })}
          </span>
          <span>Sexo: {sex}</span>
          <span>Raça: {race}</span>
          <span>Porte: {size}</span>
        </S.AnimalInfo>
        {listType === 'my-animals' ? (
          <S.MyAnimalsButtonsWrapper>
            <Button>Confirmar adoção</Button>
            <S.MyAnimalsButton type="edit">
              <Pencil size={24} />
            </S.MyAnimalsButton>
            <S.MyAnimalsButton type="delete">
              <Trash size={24} />
            </S.MyAnimalsButton>
          </S.MyAnimalsButtonsWrapper>
        ) : (
          <Button>Contatar dono</Button>
        )}
      </S.Content>
    </S.Wrapper>
  )
}
