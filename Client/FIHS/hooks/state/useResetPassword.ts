import { create } from 'zustand'

interface Email {
    email: string
    setEmail: (email: string) => void,
    token: string
    setToken: (token: string) => void,
}

export const useResetPassword = create<Email>((set) => ({
    email: '',
    setEmail: (email: string) => set((state) => (
        { email: email }
    )),
    token: '',
    setToken: (token: string) => set((state) => (
        { token: token }
    )),
}))