'use client'

import { useContext, useMemo, useState } from 'react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

import * as S from './styles'
import { Button } from '@/components/Button'
import { AnimalsContext } from '@/contexts/animals'
import { Animal } from '@/@types/animal'

export default function Page({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<Animal | null>(null)

  const { getAnimalById } = useContext(AnimalsContext)

  useMemo(() => {
    const getAnimalResponse = getAnimalById(params.id)
    setAnimal(getAnimalResponse)
  }, [getAnimalById, params.id])

  if (!animal) return <span>Carregando...</span>

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
