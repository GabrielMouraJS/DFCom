import { AppProvider } from '../context'
import GlobalStyle from '../styles/globals'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ToastContainer />
      <GlobalStyle />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
