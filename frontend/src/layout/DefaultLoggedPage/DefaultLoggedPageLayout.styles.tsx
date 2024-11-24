import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const AsideMenu = styled.aside`
  display: none;
  position: fixed;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray[200]};

  @media (min-width: 770px) {
    display: flex;
    flex-direction: column;

    width: 300px;
  }

  @media (min-width: 1300px) {
    width: 400px;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  margin: 1rem 0;

  span {
    font-size: 24px;
    font-weight: 700;
  }
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`

export const PageContent = styled.div`
  width: 100%;
  padding: 2rem;

  @media (min-width: 770px) {
    width: calc(100vw - 300px);
    margin-left: 300px;
  }

  @media (min-width: 1300px) {
    width: calc(100vw - 400px);
    margin-left: 400px;
  }
`
