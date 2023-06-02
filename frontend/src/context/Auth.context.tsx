// contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import nookies from 'nookies'
import api from '../lib/api'

interface User {
  id: string
  email: string
  password: string
}

interface SignInCredentials {
  email: string
  password: string
}
interface AuthContextData {
  user: User
  loading: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  refreshUserToken(): Promise<void>
  signUp(credentials: SignInCredentials): Promise<void>
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [loading] = useState(true)

  useEffect(() => {
    getMe()
  }, [])
  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/auth/login', {
      username: email,
      password,
    })
    const { authorization, refreshToken, user } = response.data

    nookies.set(null, 'accessToken', authorization, {
      path: '/',
    })
    nookies.set(null, 'refreshToken', refreshToken, {
      path: '/',
    })
    nookies.set(null, 'user', JSON.stringify(user), {
      path: '/',
    })

    setUser(user)
  }

  async function getMe() {
    const { accessToken } = nookies.get()
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { user } = response.data
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const refreshUserToken = async () => {
    const { refreshToken } = nookies.get()
    if (!refreshToken) return
    const response = await api.post('/auth/refresh-token', {
      refreshToken,
    })
    const { authorization, refreshToken: newRefreshToken, user } = response.data

    nookies.set(null, 'accessToken', authorization, {
      path: '/',
      maxAge: 60 * 3, // 3 minute
    })
    nookies.set(null, 'refreshToken', newRefreshToken, {
      path: '/',
      maxAge: 60 * 60, // 60 minutes
    })

    nookies.set(null, 'user', JSON.stringify(user), {
      path: '/',
    })

    setUser(user)
  }

  // @todo: move this responsability to UserContext
  const signUp = async ({ email, password }: SignInCredentials) => {
    await api.post('/users/register', {
      email,
      password,
    })
  }

  const signOut = async () => {
    nookies.destroy(null, 'accessToken')
    nookies.destroy(null, 'refreshToken')
    nookies.destroy(null, 'user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, refreshUserToken, signIn, signUp, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
