import Head from 'next/head'
import { SignContainer } from '../styles/pages/SignIn.module'
import Button from '../components/Button'
import SignAnimation from '../components/SignAnimation'
import Input from '../components/Input'
import Logo from '../components/Logo'

export default function Home() {
  return (
    <>
      <Head>
        <title>DFCom - Sistemas e informática</title>
      </Head>
      <SignContainer>
        <section className="form">
          <Logo />

          <form>
            <h1>Faça seu login</h1>
            <Input placeholder="Sua ID" type="text" error={undefined} />
            <Input placeholder="Senha" type="password" error={undefined} />
            <Button type="button">Acessar</Button>
          </form>
        </section>

        <SignAnimation></SignAnimation>
      </SignContainer>
    </>
  )
}
