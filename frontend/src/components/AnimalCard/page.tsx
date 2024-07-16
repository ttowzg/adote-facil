import * as S from './styles'
import Image from 'next/image'
import { Button } from '../Button'
import { calculateAnimalAge } from '@/helpers/calculate-animal-age'

interface AnimalCardProps {
  id: number
  type: string
  monthOfBirth?: number
  yearOfBirth?: number
  sex: 'Macho' | 'Fêmea'
  race: string
  size: 'Pequeno' | 'Médio' | 'Grande'
  images: string[]
}

// TODO implementar carrossel de imagens
// TODO melhorar estilização da imagem pra não quebrar o layout
export function AnimalCard(props: AnimalCardProps) {
  const { id, type, monthOfBirth, yearOfBirth, sex, race, size, images } = props

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
        <Button>Contatar dono</Button>
      </S.Content>
    </S.Wrapper>
  )
}
