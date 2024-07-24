import { CaretDown, Check } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'

import * as S from './styles'

interface SelectItem {
  value: string
  placeholder: string
}

interface DefaultSelectProps {
  placeholder: string
  items: SelectItem[]
}

// TODO adicionar animações de estilo
export function DefaultSelect({ placeholder, items }: DefaultSelectProps) {
  return (
    <Select.Root>
      <S.SelectTrigger>
        <S.SelectValue placeholder={placeholder} />
        <S.SelectIcon>
          <CaretDown size={24} />
        </S.SelectIcon>
      </S.SelectTrigger>
      <Select.Portal>
        <S.SelectContent>
          <S.SelectScrollUpButton>
            <CaretDown />
          </S.SelectScrollUpButton>
          <S.SelectViewport>
            {items.map((item) => (
              <S.SelectItem key={item.value} value={item.value}>
                <S.SelectItemIndicator>
                  <Check size={14} />
                </S.SelectItemIndicator>
                <Select.ItemText>{item.placeholder}</Select.ItemText>
              </S.SelectItem>
            ))}
          </S.SelectViewport>
          <Select.ScrollDownButton>
            <CaretDown />
          </Select.ScrollDownButton>
        </S.SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}
