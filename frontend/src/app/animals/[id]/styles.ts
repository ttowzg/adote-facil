import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: calc(100vh - 5rem);
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
`

export const AnimalPicturesSwiper = styled(Swiper)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 10rem;
  height: 16rem;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.gray[900]};
  }
`

export const AnimalPictureSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 14rem;

  position: relative;

  img {
    border-radius: 6px;
  }
`

export const AnimalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: center;

  font-size: 1.5rem;
`

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
