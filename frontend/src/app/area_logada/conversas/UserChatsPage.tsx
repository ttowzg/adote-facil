'use client'

import { getUserChats } from '@/api/get-user-chats'
import * as S from './UserChatsPage.styles'
import { useEffect, useState } from 'react'
import { getUserData } from '@/helpers/get-user-data'
import { ChatCircleText, ArrowUp, ArrowDown } from '@phosphor-icons/react'
import { getCookie } from 'cookies-next'
import { format, isSameDay, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChatComponent } from '@/components/Chat'
import { Chat } from '@/@types/chat'

export function UserChatsPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [openChat, setOpenChat] = useState<Chat | null>(null)
  const loggedUser = getUserData()

  useEffect(() => {
    const fetchUserChats = async () => {
      const token = getCookie('token')

      const response = await getUserChats(token || '')

      if (response.status === 200) {
        setChats(response.data)
      }
    }

    fetchUserChats()
  }, [])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()

    if (isSameDay(date, now)) {
      return format(date, 'HH:mm')
    } else if (differenceInDays(now, date) < 7) {
      return format(date, 'eeee', { locale: ptBR })
    } else {
      return format(date, 'dd/MM/yyyy')
    }
  }

  const handleOpenChatClick = (chat: Chat) => {
    setOpenChat(chat)
  }

  const handleReturnToChatsListClick = () => {
    setOpenChat(null)
  }

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Minhas conversas</h1>
      </S.TitleWrapper>

      {openChat ? (
        <ChatComponent
          chatId={openChat.id}
          userData={loggedUser}
          handleReturnToChatsListClick={handleReturnToChatsListClick}
        />
      ) : (
        chats.map((chat) => (
          <S.UserChat key={chat.id} onClick={() => handleOpenChatClick(chat)}>
            <ChatCircleText size={48} />

            <S.ChatContent>
              <S.ChatContentHeader>
                <S.ChatUserName>
                  {chat.user1.id === loggedUser?.id
                    ? chat.user2.name
                    : chat.user1.name}
                </S.ChatUserName>
                <S.ChatLastMessageTime>
                  {formatDate(chat.messages[0].createdAt)}
                </S.ChatLastMessageTime>
              </S.ChatContentHeader>

              <S.ChatLastMessage>
                {chat.messages[0].senderId === loggedUser?.id ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
                <span>{chat.messages[0].content}</span>
              </S.ChatLastMessage>
            </S.ChatContent>
          </S.UserChat>
        ))
      )}
    </S.Wrapper>
  )
}
