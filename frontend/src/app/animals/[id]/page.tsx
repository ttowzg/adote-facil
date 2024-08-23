'use client'

import { useMemo, useState } from 'react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

import * as S from './styles'
import { Button } from '@/components/Button'

interface AnimalDetailsProps {
  id: string
  type: string
  gender: 'Macho' | 'Fêmea'
  race: string
  description: string
  images: { id: string; base64: string }[]
}

export default function Page({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<AnimalDetailsProps>()

  useMemo(() => {
    const availableAnimals = JSON.parse(
      localStorage.getItem('available-animals') || '[]',
    )

    const animal = availableAnimals.find(
      (animal: AnimalDetailsProps) => animal.id === params.id,
    )

    setAnimal(animal)
  }, [params.id])

  if (!animal) return <></>

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.AnimalPicturesSwiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {animal.images.map((image, index) => (
            <S.AnimalPictureSwiperSlide key={index}>
              <Image
                src={`data:image/jpeg;base64,${image.base64}`}
                alt="Animal"
                layout="fill"
                objectFit="cover"
              />
            </S.AnimalPictureSwiperSlide>
          ))}
        </S.AnimalPicturesSwiper>

        <S.AnimalInfoWrapper>
          <span>Tipo: {animal.type}</span>
          <span>Gênero: {animal.gender}</span>
          <span>Raça: {animal.race}</span>
        </S.AnimalInfoWrapper>

        <S.AnimalDescriptionWrapper>
          <span>Descrição</span>
          <span>{animal.description}</span>
        </S.AnimalDescriptionWrapper>
      </S.ContentWrapper>

      <Button type="submit">Cadastrar</Button>
    </S.Wrapper>
  )
}
