import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    background-color: ${theme.colors.gray[300]};
    border-radius: 6px;

    overflow: hidden;

    width: calc(100vw - 6rem);
    height: calc(100vh - 4rem);

    @media (min-width: 770px) {
      /* height: calc(100vh - 4rem); */
      width: calc(100vw - 300px - 6rem);
    }

    @media (min-width: 1300px) {
      width: calc(100vw - 400px - 6rem);
    }
  `}
`

export const ChatHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 2rem;

    background-color: ${theme.colors.gray[200]};

    padding: 1rem;

    span {
      font-size: 1.5rem;
    }
  `}
`

export const GoBackButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: ${theme.colors.green[300]};
    }
  `}
`

export const ChatMessageList = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;

  gap: 0.5rem;
  overflow-y: auto;
  flex-grow: 1;
`

interface ChatMessageWrapperProps {
  $isUserMessage: boolean
}

export const ChatMessageWrapper = styled.div<ChatMessageWrapperProps>`
  ${({ $isUserMessage }) => css`
    display: flex;
    flex-direction: row;

    width: 100%;

    justify-content: ${$isUserMessage ? 'flex-end' : 'flex-start'};
  `}
`

export const ChatMessage = styled.div<ChatMessageWrapperProps>`
  ${({ theme, $isUserMessage }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${$isUserMessage ? 'flex-end' : 'flex-start'};

    background-color: ${theme.colors.gray[200]};
    border-radius: 6px;

    padding: 0.5rem 1rem;

    max-width: 70%;

    > span:last-child {
      font-size: 0.75rem;
    }
  `}
`

export const ChatSendMessageInputWrapper = styled.div``

export const ChatSendMessageInput = styled.input``

export const ChatSendMessageButton = styled.div``
