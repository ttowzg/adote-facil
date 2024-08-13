import styled, { css } from 'styled-components'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
`

export const AnimalTypeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;

  > span::after {
    content: '*';
    color: ${({ theme }) => theme.colors.red[700]};
  }
`

export const AnimalGenderInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 50%;

  > span::after {
    content: '*';
    color: ${({ theme }) => theme.colors.red[700]};
  }
`

export const AnimalRaceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  label {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    input {
      padding: 0.5rem;
    }
  }
`

export const AnimalDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;

  label {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    textarea {
      padding: 0.5rem;
      height: 4rem;
    }
  }
`

export const AnimalPicturesInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  width: 100%;

  input {
    display: none;
  }
`

export const AddAnimalPicturesSwiper = styled(Swiper)`
  display: flex;

  justify-content: flex-start;
  margin: 0px;
  overflow: hidden;

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
`

export const AnimalPictureSwiperSlide = styled(SwiperSlide)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 94px;

    border-radius: 6px;

    gap: 0.5rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      padding: 0.25rem 0.5rem;

      border: none;
      border-radius: 4px;
      background-color: ${theme.colors.gray[300]};
      color: ${theme.colors.red[700]};

      font-size: 10px;
    }
  `}
`

export const AnimalPicturesInput = styled.label`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;

    width: 92px;
    height: 135px;

    color: ${theme.colors.green[300]};
    border: 1px solid ${theme.colors.green[300]};
    border-radius: 6px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${theme.colors.green[300]};
      border-radius: 100%;

      width: 32px;
      height: 32px;
    }
  `}
`

export const AnimalPicture = styled(Image)`
  border-radius: 6px;
  width: 94px;
  height: 135px;

  object-fit: cover;
`
