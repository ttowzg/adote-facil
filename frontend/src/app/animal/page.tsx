'use client'

import { Header } from '@/components/Header'

import * as S from './styles'

import { DefaultSelect } from '@/components/DefaultSelect/DefaultSelect'
import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { Plus } from '@phosphor-icons/react'

// TODO implementar regra do input nasc ter o formato de data
export default function Animal() {
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        <S.TitleWrapper>
          <h1>Cadastrar animal para adoção</h1>
        </S.TitleWrapper>

        <S.Form>
          <S.FormRow>
            <S.AnimalTypeInputWrapper>
              <span>Tipo</span>
              <DefaultSelect
                placeholder="Selecione um tipo"
                items={animalTypesForSelect}
              />
            </S.AnimalTypeInputWrapper>

            <S.AnimalBirthInputWrapper>
              <label>
                Nasc.
                <input type="text" />
              </label>
            </S.AnimalBirthInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalRaceInputWrapper>
              <label>
                Raça
                <input type="text" />
              </label>
            </S.AnimalRaceInputWrapper>

            <S.AnimalGenderInputWrapper>
              <span>Gênero</span>
              <DefaultSelect placeholder="" items={animalGenderForSelect} />
            </S.AnimalGenderInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalSizeWrapper>
              <span>Porte</span>
              <S.RadioGroupRoot>
                <S.RadioGroupItemWrapper>
                  <S.RadioGroupItem value="pequeno" id="r1">
                    <S.RadioGroupIndicator />
                  </S.RadioGroupItem>
                  <label htmlFor="r1">Pequeno</label>
                </S.RadioGroupItemWrapper>
                <S.RadioGroupItemWrapper>
                  <S.RadioGroupItem value="medio" id="r2">
                    <S.RadioGroupIndicator />
                  </S.RadioGroupItem>
                  <label htmlFor="r2">Médio</label>
                </S.RadioGroupItemWrapper>
                <S.RadioGroupItemWrapper>
                  <S.RadioGroupItem value="grande" id="r3">
                    <S.RadioGroupIndicator />
                  </S.RadioGroupItem>
                  <label htmlFor="r3">Grande</label>
                </S.RadioGroupItemWrapper>
              </S.RadioGroupRoot>
            </S.AnimalSizeWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalPicturesInputWrapper>
              <label>Fotos</label>
              <input
                type="file"
                id="animalPictures"
                name="animalPictures"
                accept="image/png, image/jpeg"
              />
              <S.AnimalPicturesInput htmlFor="animalPictures">
                <div>
                  <Plus size={24} />
                </div>
                <span>Adicionar</span>
              </S.AnimalPicturesInput>
            </S.AnimalPicturesInputWrapper>
          </S.FormRow>
        </S.Form>
      </S.Content>
    </S.Wrapper>
  )
}
