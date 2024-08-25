export type Animal = {
  id: string
  type: string
  gender: 'Macho' | 'Fêmea'
  race: string
  description: string
  images: { id: string; base64: string }[]
}
