import { differenceInMonths, differenceInYears } from 'date-fns'

interface CalculateAnimalAgeParams {
  monthOfBirth?: number
  yearOfBirth?: number
}

export function calculateAnimalAge({
  monthOfBirth,
  yearOfBirth,
}: CalculateAnimalAgeParams): string {
  if (!monthOfBirth || !yearOfBirth) {
    return 'N/D'
  }

  const currentDate = new Date()
  const birthDate = new Date(yearOfBirth, monthOfBirth - 1) // month is zero-based in JavaScript Date

  const years = differenceInYears(currentDate, birthDate)
  const months = differenceInMonths(currentDate, birthDate) % 12

  let ageString = ''

  if (years > 0) {
    ageString += `${years} ano${years > 1 ? 's' : ''}`
  }

  if (months > 0) {
    if (ageString.length > 0) {
      ageString += ' e '
    }
    ageString += `${months} ${months > 1 ? 'meses' : 'mês'}`
  }

  return ageString
}
