import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  padding: 2rem 1rem;

  gap: 0.5rem;

  footer {
    display: flex;
    justify-content: center;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const LoginFormInputsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${theme.colors.white};

    label {
      display: flex;
      flex-direction: column;

      gap: 0.5rem;
    }

    input {
      height: 2rem;
    }
  `}
`
