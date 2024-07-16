import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 10px;

    padding: 0.5rem;
    gap: 0.5rem;

    background-color: ${theme.colors.gray[200]};
  `}
`

export const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 6px;

  min-width: 10.5rem;
  height: 10.5rem;

  img {
    width: auto;
    height: auto;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  width: 100%;

  button {
    height: 2rem;
    font-size: 0.75rem;
  }
`

export const AnimalInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  font-size: 0.75rem;
`
