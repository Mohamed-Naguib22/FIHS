import { useMutation, useQuery } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import { ResetPassword } from '@/models/ResetPassword'
import useSession, { DEFAULT_SESSION } from './state/useSession'
import Toast from 'react-native-toast-message'
import { PersonalInfo } from '@/models/PersonalInfo'
import storage from '../utils/storage'
import { useRouter } from 'expo-router'
import { useResetPassword } from './state/useResetPassword'
import { ForgetPasswordResetSchema } from '@/models/ForgetPasswordReset'
import { ImagePickerAsset } from 'expo-image-picker'
import ConvertImg from '@/utils/ConvertImg'
export const useProfile = () => useQuery<Session>({
    queryKey: ['profile'],
    queryFn: () => api.get<Session>(`User/profile`).then((res) => res.data)

})
export default useProfile



export const UpdateProfile = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async (vals: PersonalInfo) =>
            await userApi(token, await localRt).put<Session>(`User/update-profile`, { firstName: vals.firstName, lastName: vals.lastName, phoneNumber: vals.phoneNumber }).then((res) => {
                setSession(res.data)
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت العملية بنجاح',
                    text2: 'تم تحديث بيانات حسابك بنجاح'
                })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err);

            })
    })
}


export const UpdatePassword = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async (vals: ResetPassword) => {
            await userApi(token, await localRt).put<Session>(`Auth/change-password`, vals).then((res) => {
                setSession(res.data)
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت العملية بنجاح',
                    text2: 'تم تحديث كلمة مرورك بنجاح'
                })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
            })
        }

    })
}



export const PostProfileImg = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async ({ img }: { img: ImagePickerAsset }) => {
            let fd = new FormData()
            //@ts-ignore
            fd.append('ImgFile', ConvertImg(img))
            await userApi(token, await localRt).post<Session>(`User/set-image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {

                setSession(res.data)
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت العملية بنجاح',
                    text2: 'تم تحديث صورتك الشخصية بنجاح'
                })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
                console.log(err.response.data);

            })
        }
    })
}



export const DeleteProfileImg = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async () => {
            await userApi(token, await localRt).delete<Session>(`User/delete-image`).then((res) => {
                setSession(res.data)
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت العملية بنجاح',
                    text2: 'تم حذف صورتك الشخصية بنجاح'
                })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
            })
        }
    })
}


export const useDeleteAccount = () => {
    const { token, setSession } = useSession()
    const router = useRouter()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async () => {
            await userApi(token, await localRt).delete<Session>(`User/delete-account`).then((res) => {
                //@ts-ignore
                setSession(DEFAULT_SESSION)
                storage.remove({
                    key: 'refreshToken'
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت العملية بنجاح',
                    text2: 'تم حذف حسابك بنجاح'
                })
                router.replace('/(auth)/login')
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
            })
        }
    })
}

export const useForgetPassword = () => {
    const { setEmail, setToken } = useResetPassword()

    const router = useRouter()
    return useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            await api.post<{ token: string }>(`Auth/forget-password`, { email }).then((res) => {
                setEmail(email)
                setToken(res.data.token)
                Toast.show({
                    type: 'success',
                    text1: 'تم إرسال بريد إلكتروني لك بنجاح',
                    text2: "ارسل الكود المرفق علي بريدك"
                })
                router.replace('/(auth)/passwordCode')
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
            })
        }
    })
}


export const useForgetPasswordReset = () => {
    const router = useRouter()
    const { setSession } = useSession()
    return useMutation({
        mutationFn: async (vals: ForgetPasswordResetSchema) => {
            await api.post<Session>(`Auth/reset-password`, {
                email: vals.email,
                token: vals.token,
                code: vals.verificationCode,
                newPassword: vals.newPassword
            }).then((res) => {
                setSession(res.data)
                let rt = res.headers['set-cookie']?.[0]
                storage.save({
                    key: 'refreshToken',
                    data: rt
                })
                Toast.show({
                    type: 'success',
                    text1: 'تمت بنجاح',
                    text2: "تم إعادة تعيين كلمة مرورك"
                })
                router.replace('/(tabs)/home')
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'خطأ',
                    text2: err.response.data
                })
            })
        }
    })
}


