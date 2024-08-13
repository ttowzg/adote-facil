import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 4rem);
  padding: 1rem;
  box-sizing: border-box;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    }
  `}
`
