import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'

export function DefaultDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <S.DialogOverlay />
      <S.DialogContent>{children}</S.DialogContent>
    </Dialog.Portal>
  )
}
