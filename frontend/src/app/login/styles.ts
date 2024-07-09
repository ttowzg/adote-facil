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

export const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const LoginForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding-bottom: 1.5rem;

    border-bottom: 1px solid ${theme.colors.gray[800]};
  `}
`

export const LoginFormRow = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`

export const LoginFormInput = styled.input`
  ${({ theme }) => css`
    height: 2rem;
    border-radius: 6px;

    color: ${theme.colors.gray[800]};
    background-color: ${theme.colors.gray[200]};
    border: 1px solid ${theme.colors.gray[500]};

    padding: 0.5rem 1rem;
  `}
`
