import { useState, useCallback, useEffect } from 'react'

const STORAGE_NAME = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)

  const login = useCallback( ({ token, user }) => {
    setToken(token)
    setUser(user)

    localStorage.setItem(STORAGE_NAME, window.btoa(JSON.stringify({ token, user })))
  }, [])

  const logout = useCallback( () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(STORAGE_NAME)
  }, [])

  useEffect( () => { 
    const parseStorageAndLogin = () => {
      try {
        let data = JSON.parse(window.atob(localStorage.getItem(STORAGE_NAME)))
        if (data && data.token && data.user) {
          login(data)
        }
        setReady(true)
      } catch (error) {
        logout()
        setReady(true)
      }
    }
    parseStorageAndLogin()

    window.addEventListener('storage', parseStorageAndLogin)

    return () => window.removeEventListener('storage', parseStorageAndLogin);   
  }, [login, logout])

  return { login, logout, token, user, ready }
}