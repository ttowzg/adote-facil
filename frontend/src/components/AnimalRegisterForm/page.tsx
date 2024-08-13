import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { DefaultSelect } from '../DefaultSelect'
import * as S from './styles'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

// TODO implementar regra do input nasc ter o formato de data
export function AnimalRegisterForm() {
  const [animalPictures, setAnimalPictures] = useState<File[]>([])

  const handleAnimalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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
    <S.Form>
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
          />
          <S.AddAnimalPicturesSwiper spaceBetween={10} slidesPerView={3}>
            <S.AnimalPictureSwiperSlide>
              <S.AnimalPicturesInput htmlFor="animalPictures">
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
    </S.Form>
  )
}
