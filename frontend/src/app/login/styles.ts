import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 3rem;
    padding-bottom: 1rem;

    background-color: ${theme.colors.gray[200]};

    h1 {
      color: ${theme.colors.white};
      font-size: 1.5rem;
    }
  `}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
