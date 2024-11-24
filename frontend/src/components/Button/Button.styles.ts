import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    height: 3rem;
    width: 100%;
    border-radius: 6px;

    color: ${theme.colors.white};
    background-color: ${theme.colors.green[300]};

    border: none;

    cursor: pointer;

    font-weight: 800;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`
