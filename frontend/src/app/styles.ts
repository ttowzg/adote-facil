'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem;
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    h1 {
      color: ${theme.colors.white};
      font-size: 1rem;
      font-weight: 600;
    }

    button {
      height: 1.75rem;
      width: 6rem;

      font-size: 0.75rem;
      font-weight: 700;
    }
  `}
`

export const AnimalsListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`
