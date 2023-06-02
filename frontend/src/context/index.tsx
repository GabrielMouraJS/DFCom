import { AuthProvider } from './Auth.context'

export const AppProvider = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)
