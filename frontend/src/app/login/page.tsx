'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'

import * as S from './styles'
import logo from '../../assets/logo-big.png'

const createUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email('Email inválido'),
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória' })
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>

// TODO implementar integracao com o login do backend
export default function Page() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const handleSubmitForm = async (data: CreateUserFormData) => {
    // const response = await registerUser(data)
    // if (response.status !== 201) {
    //   const message =
    //     response.data.message ||
    //     'Falha ao cadastrar! Por favor tente novamente!'
    //   alert(message)
    //   router.push('/cadastro')
    //   return
    // }
    // alert(
    //   'Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!',
    // )
    // router.push('/login')
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Image src={logo} alt="Logo" width={145} height={42} />
      </S.Header>
      <S.Aside>
        <Image src={logo} alt="Logo" width={145} height={42} />
      </S.Aside>
      <S.Content>
        <S.LoginForm onSubmit={handleSubmit(handleSubmitForm)}>
          <h1>Faça login em nossa plataforma</h1>
          <S.LoginFormInputsWrapper>
            <label>
              Email
              <input type="email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label>
              Senha
              <PasswordInput zodRegister={register} fieldName="password" />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
          </S.LoginFormInputsWrapper>

          <S.LoginFormButtonWrapper>
            <Button type="submit">Cadastrar</Button>
          </S.LoginFormButtonWrapper>
        </S.LoginForm>
        <S.LoginFormFooter>
          <span>
            Já possui uma conta? <a href="/login">Faça login</a>
          </span>
        </S.LoginFormFooter>
      </S.Content>
    </S.Wrapper>
  )
}
