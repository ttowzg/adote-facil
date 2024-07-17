import { SmileySad } from '@phosphor-icons/react'
import * as S from './styles'

export function EmptyAnimals() {
  return (
    <S.Wrapper>
      <SmileySad size={144} />
      <span>
        Desculpe, no momento não temos nenhum animal disponível para adoção
      </span>
    </S.Wrapper>
  )
}
