import api, { userApi } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import useSession, { DEFAULT_SESSION } from './state/useSession';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AxiosResponse } from 'axios';
import storage from '@/utils/storage';

const useLogin = () => {
    const { setSession, setLoading } = useSession()
    const router = useRouter()
    return useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }): Promise<any> => {
            setLoading(true)
            await api.post<Session, AxiosResponse<Session, { msg: string }>>(`/Auth/login`, { email: email, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                setSession(res.data)
                setLoading(false)
                if (!(res.data as any).isVerified) {
                    router.push('/(auth)/verificationCode/')
                } else {
                    router.replace('/(tabs)/home')
                }
            }).catch((err) => {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response);
            })
        }
    })
}
export default useLogin

export const Logout = () => {
    const { setSession, setLoading, token, setChatMessages } = useSession()
    const rf = storage.load({ key: 'refreshToken' })
    const router = useRouter()
    return useMutation({
        mutationFn: async (): Promise<any> => {
            setLoading(true)
            await userApi(token, await rf).get(`/Auth/logout`,).then((res) => {
                storage.remove({ key: 'refreshToken' })
                //@ts-ignore
                setSession(DEFAULT_SESSION)
                setChatMessages([])
                setLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'تمت',
                    text2: res.data
                })
                router.replace('/(auth)/login')
            }).catch((err) => {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response);
            })
        }
    })
}

export const useRegister = () => {
    const { setSession, setLoading, setEmail } = useSession()
    const router = useRouter()
    return useMutation({
        mutationFn: async ({ firstName, lastName, email, password, phoneNumber }: 
            { firstName: string, lastName: string, email: string, password: string, phoneNumber: string }): Promise<any> => {
            setLoading(true)
            await api.post(`/Auth/register`, { firstName, lastName, email, password, phoneNumber }).then((res) => {
                //@ts-ignore
                setSession({ email: email })
                setLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'تمت',
                    text2: res.data
                })
                if (!res.data.isVerified) {
                    router.push('/(auth)/verificationCode/')
                    setEmail(email)
                }
            }).catch((err) => {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response);
            })
        }
    })
}

export const useVerify = () => {
    const { setSession, setLoading } = useSession()
    const router = useRouter()
    return useMutation({
        mutationFn: async ({ verificationCode }: { verificationCode: string }): Promise<any> => {
            setLoading(true)
            const email = await storage.load({ key: 'email' })
            await api.post(`/Auth/verify-account`, { email, verificationCode }).then(async (res) => {
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                setSession(res.data)
                await storage.remove({ key: 'email' })
                setLoading(false)

                router.replace('/(tabs)/home')
            }).catch((err) => {
                setLoading(false)
                router.replace('/(auth)/verificationCode')
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response);
            })
        }
    })
}

export const useResendCode = () => {
    const { setLoading } = useSession()
    const router = useRouter()
    return useMutation({
        mutationFn: async (): Promise<any> => {
            const email = await storage.load({ key: 'email' })
            setLoading(true)
            await api.post(`/Auth/resend-verification-code`, { email }).then((res) => {
                setLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'تمت',
                    text2: res.data
                })
                router.replace('/(auth)/verificationCode')
            }).catch((err) => {
                setLoading(false)
                router.replace('/(auth)/verificationCode')
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response);
            })
        }
    })
}