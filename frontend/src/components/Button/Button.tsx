import * as S from './styles'

interface ButtonProps {
  text: string
  onClick: () => void
}

// TODO receber propriedades default de um botão também
export function Button({ text, onClick }: ButtonProps) {
  return <S.Button onClick={onClick}>{text}</S.Button>
}
