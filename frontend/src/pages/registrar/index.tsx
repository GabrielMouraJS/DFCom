import Link from 'next/link'
import Logo from '../../components/Logo'
import { RegisterContainer } from '../../styles/pages/SignUp.module'
import Input from '../../components/Input'
import { FaArrowLeft } from 'react-icons/fa'
import Button from '../../components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/Auth.context'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const schema = z.object({
  email: z
    .string()
    .email('E-Mail Invalido')
    .min(1, { message: 'E-mail é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
})
interface SignUpFormData {
  email: string
  password: string
}
export default function SignUp() {
  const { signUp } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  async function handleSignUp(data: SignUpFormData) {
    try {
      await signUp(data)
      toast.success('Cadastro verificado com sucesso')
      await router.push('/')
    } catch (error) {
      toast.error('Erro ao fazer cadastrar, verifique as credenciais')
    }
  }

  return (
    <RegisterContainer>
      <div className="content">
        <section>
          <Logo />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro para ter acesso a listagem completa dos usuários
          </p>
          <Link href="/" className="backLink">
            <FaArrowLeft size={16} color="#75cddb" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <Input
            placeholder="Seu E-mail"
            type="text"
            error={errors.email as any}
            {...register('email')}
          />
          <Input
            placeholder="Sua Senha"
            type="password"
            error={errors.password as any}
            {...register('password')}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    </RegisterContainer>
  )
}
