import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 5rem);
`

export const GoBackButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;

    width: 100%;

    a {
      color: ${theme.colors.white};
    }

    a:hover {
      transition: color 0.5s;
      color: ${theme.colors.green[300]};
    }
  `}
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1rem;

  width: 100%;
`

export const AnimalPicturesSwiper = styled(Swiper)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 80rem;
  height: 40rem;

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

  width: 80rem;
  height: 40rem;

  position: relative;

  img {
    border-radius: 30px;
  }
`

export const AnimalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  align-items: flex-start;
`

export const AnimalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span:first-child {
    font-size: 1.25rem;
    font-weight: bold;
  }
`
