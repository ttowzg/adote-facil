import * as S from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <S.Button onClick={onClick} {...props}>
      {children}
    </S.Button>
  )
}
