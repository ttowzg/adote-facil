'use client'

import { useContext, useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

import * as S from './styles'
import { Button } from '@/components/Button'
import { AnimalsContext } from '@/contexts/animals'
import { Animal } from '@/@types/animal'
import { useParams } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react'
import Link from 'next/link'

export default function Page() {
  const [animal, setAnimal] = useState<Animal | null>(null)

  const params = useParams<{ id: string }>()

  const { getAnimalById } = useContext(AnimalsContext)

  useEffect(() => {
    const getAnimalResponse = getAnimalById(params.id)
    console.log({ getAnimalResponse })
    setAnimal(getAnimalResponse)
  }, [getAnimalById, params.id])

  if (!animal) return <span>Carregando...</span>

  return (
    <S.Wrapper>
      <S.GoBackButtonWrapper>
        <Link href="/area_logada/animais_disponiveis">
          <ArrowLeft size={32} />
        </Link>
      </S.GoBackButtonWrapper>
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
                src={`data:image/jpeg;base64,${image}`}
                alt="Animal"
                fill={true}
                objectFit="cover"
              />
            </S.AnimalPictureSwiperSlide>
          ))}
        </S.AnimalPicturesSwiper>

        <S.AnimalInfoWrapper>
          <span>Tipo: {animal.type}</span>
          <span>Gênero: {animal.gender}</span>
          <span>Raça: {animal.race ?? 'SRD'}</span>
        </S.AnimalInfoWrapper>

        <S.AnimalDescriptionWrapper>
          <span>Descrição</span>
          <span>{animal.description ?? 'N/D'}</span>
        </S.AnimalDescriptionWrapper>

        <Button type="submit">Entrar em contato com o dono</Button>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
