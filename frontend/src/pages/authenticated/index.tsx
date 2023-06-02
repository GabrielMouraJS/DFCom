import { GetServerSideProps } from 'next'
import { useAuth } from '../../context/Auth.context'
import nookies from 'nookies'
import CongratulationsAnimation from '../../components/CongratulationsAnimation'
import Button from '../../components/Button'
import { useRouter } from 'next/router'
export default function Authenticated() {
  const { user, refreshUserToken, signOut } = useAuth()
  const router = useRouter()
  if (!user) refreshUserToken()

  function handleSignOut() {
    signOut()
    return router.push('/')
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <CongratulationsAnimation></CongratulationsAnimation>
      <div style={{ width: 200, height: 50 }}>
        <Button onClick={handleSignOut}>
          <strong>Sair da Aplicação</strong>
        </Button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = nookies.get(ctx)

  if (!accessToken && !refreshToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
