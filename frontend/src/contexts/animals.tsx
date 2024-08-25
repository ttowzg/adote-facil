import { Animal } from '@/@types/animal'
import { mockAnimals } from '@/mocks/animals'
import { createContext, ReactNode, useState } from 'react'

interface AnimalsContextType {
  availableAnimals: Animal[]
  fetchAvailableAnimals: () => void
  selectedAnimalToShowDetails: Animal | null
  selectAnimalToShowDetails: (animalId: string) => void
  closeAnimalDetails: () => void
}

export const AnimalsContext = createContext({} as AnimalsContextType)

export function AnimalsContextProvider({ children }: { children: ReactNode }) {
  const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([])
  const [selectedAnimalToShowDetails, setSelectedAnimalToShowDetails] =
    useState<Animal | null>(null)

  const fetchAvailableAnimals = () => {
    // TODO fetch animals from backend
    setAvailableAnimals(mockAnimals)
  }

  const selectAnimalToShowDetails = (animalId: string) => {
    const animal = availableAnimals.find((animal) => animal.id === animalId)
    setSelectedAnimalToShowDetails(animal ?? null)
  }

  const closeAnimalDetails = () => {
    setSelectedAnimalToShowDetails(null)
  }

  return (
    <AnimalsContext.Provider
      value={{
        availableAnimals,
        fetchAvailableAnimals,
        selectedAnimalToShowDetails,
        selectAnimalToShowDetails,
        closeAnimalDetails,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}
