'use client'

import { useContext, useEffect, useMemo } from 'react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

import * as S from './styles'
import { Button } from '@/components/Button'
import { AnimalsContext } from '@/contexts/animals'

export default function Page({ params }: { params: { id: string } }) {
  const { selectedAnimalToShowDetails, selectAnimalToShowDetails } =
    useContext(AnimalsContext)

  // console.log(selectedAnimalToShowDetails)

  useEffect(() => {
    selectAnimalToShowDetails(params.id)
  }, [selectAnimalToShowDetails, params.id])

  if (!selectedAnimalToShowDetails) return <></>

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.AnimalPicturesSwiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {selectedAnimalToShowDetails.images.map((image, index) => (
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
          <span>Tipo: {selectedAnimalToShowDetails.type}</span>
          <span>Gênero: {selectedAnimalToShowDetails.gender}</span>
          <span>Raça: {selectedAnimalToShowDetails.race}</span>
        </S.AnimalInfoWrapper>

        <S.AnimalDescriptionWrapper>
          <span>Descrição</span>
          <span>{selectedAnimalToShowDetails.description}</span>
        </S.AnimalDescriptionWrapper>
      </S.ContentWrapper>

      <Button type="submit">Cadastrar</Button>
    </S.Wrapper>
  )
}
