import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  expiresIn: number | null
  setAuth: (token: string, expiresIn: number) => void
  clearAuth: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  expiresIn: null,
  setAuth: (token, expiresIn) => set({ accessToken: token, expiresIn }),
  clearAuth: () => set({ accessToken: null, expiresIn: null }),
}))

export default useAuthStore
