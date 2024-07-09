import * as S from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function Button({ text, onClick, ...props }: ButtonProps) {
  return (
    <S.Button onClick={onClick} {...props}>
      {text}
    </S.Button>
  )
}
