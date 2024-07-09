import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    height: 3rem;
    border-radius: 6px;

    color: ${theme.colors.white};
    background-color: ${theme.colors.green[300]};

    border: none;

    cursor: pointer;

    font-weight: 800;
  `}
`
