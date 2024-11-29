export function getUserData(): {
  id: string
  name: string
  email: string
} | null {
  const user = localStorage.getItem('user')

  if (!user) return null

  return JSON.parse(user)
}
