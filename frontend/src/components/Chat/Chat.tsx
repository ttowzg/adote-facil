import { ArrowFatLinesRight, ArrowLeft } from '@phosphor-icons/react'
import * as S from './Chat.styles'
import { UserData } from '@/@types/user-data'
import { Chat } from '@/@types/chat'
import { useEffect, useRef, useState } from 'react'
import { getCookie } from 'cookies-next'
import { getUserChat } from '@/api/get-user-chat'
import { format } from 'date-fns'

interface ChatProps {
  chatId: string
  userData: UserData | null
  handleReturnToChatsListClick(): void
}

export function ChatComponent({
  chatId,
  userData,
  handleReturnToChatsListClick,
}: ChatProps) {
  const [chat, setChat] = useState<Chat | null>(null)
  const messageListRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchUserChat = async () => {
      const token = getCookie('token')

      const response = await getUserChat(token || '', chatId)

      if (response.status === 200) {
        setChat(response.data)
      }
    }

    fetchUserChat()
  }, [chatId])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [chat])

  return (
    <S.Wrapper>
      <S.ChatHeader>
        <S.GoBackButton onClick={handleReturnToChatsListClick}>
          <ArrowLeft size={32} />
        </S.GoBackButton>

        <span>
          {chat?.user1.id === userData?.id
            ? chat?.user2.name
            : chat?.user1.name}
        </span>
      </S.ChatHeader>

      <S.ChatMessageList ref={messageListRef}>
        {chat?.messages.map((message) => (
          <S.ChatMessageWrapper
            key={message.id}
            $isUserMessage={message.senderId === userData?.id}
          >
            <S.ChatMessage $isUserMessage={message.senderId === userData?.id}>
              <span>{message.content}</span>
              <span>
                {format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </span>
            </S.ChatMessage>
          </S.ChatMessageWrapper>
        ))}
      </S.ChatMessageList>

      {/* <S.ChatSendMessageInputWrapper>
        <S.ChatSendMessageInput type="text" placeholder="Digite sua mensagem" />

        <S.ChatSendMessageButton>
          <ArrowFatLinesRight size={32} />
        </S.ChatSendMessageButton>
      </S.ChatSendMessageInputWrapper> */}
    </S.Wrapper>
  )
}
