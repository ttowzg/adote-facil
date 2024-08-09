import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  padding: 1rem;

  gap: 0.5rem;

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const RegisterFormInputsWrapper = styled.div`
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
