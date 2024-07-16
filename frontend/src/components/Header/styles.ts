import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    padding: 1rem;

    background-color: ${theme.colors.gray[200]};
  `}
`
