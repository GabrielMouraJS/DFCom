import Head from 'next/head'
import {
  AnimationContainer,
  SignContainer,
} from '../styles/pages/SignIn.module'
import Button from '../components/Button'
import SignAnimation from '../components/SignAnimation'
import Input from '../components/Input'
import Logo from '../components/Logo'
import Link from 'next/link'

import { useAuth } from '../context/Auth.context'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const schema = z.object({
  email: z
    .string()
    .email('E-Mail Invalido')
    .min(1, { message: 'E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
})
interface SignInFormData {
  email: string
  password: string
}
export default function Home() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { signIn } = useAuth()

  async function handleSignIn(data: SignInFormData) {
    try {
      await signIn(data)
      toast.success('Login verificado com sucesso')
      return router.push('/authenticated')
    } catch (error) {
      toast.error('Erro ao fazer login, verifique as credenciais')
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>DFCom - Sistemas e informática</title>
      </Head>
      <SignContainer>
        <section className="form">
          <Logo />

          <form onSubmit={handleSubmit(handleSignIn)}>
            <h1>Faça seu login</h1>
            <Input
              placeholder="Seu E-mail"
              type="text"
              error={errors.email as any}
              {...register('email')}
            />
            <Input
              placeholder="Senha"
              type="password"
              error={errors.password as any}
              {...register('password')}
            />
            <Button type="submit">Acessar</Button>
            <Link href="registrar" className="backLink">
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <AnimationContainer>
          <SignAnimation></SignAnimation>
        </AnimationContainer>
      </SignContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = nookies.get(ctx)

  if (accessToken || refreshToken) {
    return {
      redirect: {
        destination: '/authenticated',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
