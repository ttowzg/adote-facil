export type Animal = {
  id: string
  userId: string
  name: string
  type: string
  gender: 'macho' | 'fêmea'
  race: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  images: { id: string; base64: string }[]
}
