import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { DefaultSelect } from '../DefaultSelect'
import * as S from './AnimalRegisterForm.styles'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { DefaultDialog } from '../DefaultDialog'
import { Button } from '../Button'

export function AnimalRegisterForm() {
  const [animalPictures, setAnimalPictures] = useState<File[]>([])
  const [maxPicsWarningModalOpen, setMaxPicsWarningModalOpen] = useState(false)

  const handleAnimalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files)

      if (
        uploadedFiles.length > 5 ||
        animalPictures.length + uploadedFiles.length > 5
      ) {
        setMaxPicsWarningModalOpen(true)
        return
      }

      setAnimalPictures([...animalPictures, ...Array.from(e.target.files)])
    }
  }

  const handleRemoveAnimalPicture = (picIndex: number) => {
    const newAnimalPictures = animalPictures.filter(
      (pic, index) => picIndex !== index,
    )

    setAnimalPictures(newAnimalPictures)
  }

  return (
    <>
      <Dialog.Root
        open={maxPicsWarningModalOpen}
        onOpenChange={setMaxPicsWarningModalOpen}
      >
        <DefaultDialog>
          <Dialog.Portal>
            <S.MaxAnimalPicturesWarningModalOverlay />
            <S.MaxAnimalPicturesWarningModalContent>
              <span>Você pode adicionar no máximo 5 fotos!</span>
              <Dialog.Close asChild>
                <Button>Fechar</Button>
              </Dialog.Close>
            </S.MaxAnimalPicturesWarningModalContent>
          </Dialog.Portal>
        </DefaultDialog>
      </Dialog.Root>
      <S.Form>
        <S.FormContent>
          <S.FormRow>
            <S.AnimalTypeInputWrapper>
              <span>Tipo</span>
              <DefaultSelect
                placeholder="Selecione um tipo"
                items={animalTypesForSelect}
              />
            </S.AnimalTypeInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalGenderInputWrapper>
              <span>Gênero</span>
              <DefaultSelect placeholder="" items={animalGenderForSelect} />
            </S.AnimalGenderInputWrapper>

            <S.AnimalRaceInputWrapper>
              <label>
                Raça
                <input type="text" />
              </label>
            </S.AnimalRaceInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalDescriptionWrapper>
              <label>
                Descrição
                <textarea />
              </label>
            </S.AnimalDescriptionWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalPicturesInputWrapper>
              <label>Fotos</label>
              <input
                type="file"
                id="animalPictures"
                name="animalPictures"
                accept="image/png, image/jpeg"
                onChange={handleAnimalImageUpload}
                multiple
                disabled={animalPictures.length >= 5}
              />
              <S.AddAnimalPicturesSwiper spaceBetween={10} slidesPerView={3}>
                <S.AnimalPictureSwiperSlide>
                  <S.AnimalPicturesInput
                    htmlFor="animalPictures"
                    enabled={animalPictures.length < 5}
                  >
                    <div>
                      <Plus size={24} />
                    </div>
                    <span>Adicionar</span>
                  </S.AnimalPicturesInput>
                </S.AnimalPictureSwiperSlide>

                {animalPictures.map((file, index) => (
                  <S.AnimalPictureSwiperSlide key={index}>
                    <S.AnimalPicture
                      src={URL.createObjectURL(file)}
                      width={92}
                      height={137}
                      alt="animal picture"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAnimalPicture(index)}
                    >
                      Remover
                    </button>
                  </S.AnimalPictureSwiperSlide>
                ))}
              </S.AddAnimalPicturesSwiper>
            </S.AnimalPicturesInputWrapper>
          </S.FormRow>
        </S.FormContent>

        <S.FormButton>
          <Button type="submit">Cadastrar</Button>
        </S.FormButton>
      </S.Form>
    </>
  )
}
