import { useMutation, useQuery } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import { ResetPassword } from '@/models/ResetPassword'
import useSession, { DEFAULT_SESSION } from './state/useSession'
import Toast from 'react-native-toast-message'
import { PersonalInfo } from '@/models/PersonalInfo'

export const useProfile = () => useQuery<Session>({
    queryKey:['profile'],
    queryFn:()=>api.get<Session>(`User/profile`).then((res)=>res.data)
    
})
export default useProfile



export const UpdateProfile = ()=>{
    const {token, setSession} = useSession()
    return useMutation({
    mutationFn: async(vals: PersonalInfo)=>
    await userApi(token).put<Session>(`‘User/update-profile`, {firstName: vals.firstName, lastName: vals.lastName, phoneNumber:vals.phoneNumber}).then((res)=>{
        setSession(res.data)
        Toast.show({
            type:'success',
            text1:'تمت العملية بنجاح',
            text2:'تم تحديث بيانات حسابك بنجاح'
        })        
    }).catch((err)=>{
        Toast.show({
            type:'error',
            text1:'خطأ',
            text2:err.response.data
        })
        console.log(err);
        
    })
})}


export const UpdatePassword = ()=>{
    const {token, setSession} = useSession()
    return useMutation({
    mutationFn: async(vals: ResetPassword)=>{
        await userApi(token).put<Session>(`Auth/change-password`, vals).then((res)=>{
            setSession(res.data)
            Toast.show({
                type:'success',
                text1:'تمت العملية بنجاح',
                text2:'تم تحديث كلمة مرورك بنجاح'
            })        
        }).catch((err)=>{
            Toast.show({
                type:'error',
                text1:'خطأ',
                text2:err.response.data
            })
        })
    }

})}



export const PostProfileImg = ()=>{
    const {token, setSession} = useSession()
    return useMutation({
    mutationFn: async({img}: {img:File})=>{
        await userApi(token).post<Session>(`User/set-image`).then((res)=>{
            setSession(res.data)
            Toast.show({
                type:'success',
                text1:'تمت العملية بنجاح',
                text2:'تم تحديث صورتك الشخصية بنجاح'
            })        
        }).catch((err)=>{
            Toast.show({
                type:'error',
                text1:'خطأ',
                text2:err.response.data
            })
        })
    }
})}



export const DeleteProfileImg = ()=>{
    const {token, setSession} = useSession()
    return useMutation({
    mutationFn: async()=>{
        await userApi(token).delete<Session>(`User/delete-image`).then((res)=>{
            setSession(res.data)
            Toast.show({
                type:'success',
                text1:'تمت العملية بنجاح',
                text2:'تم حذف صورتك الشخصية بنجاح'
            })        
        }).catch((err)=>{
            Toast.show({
                type:'error',
                text1:'خطأ',
                text2:err.response.data
            })
        })
    }
})}


export const DeleteAccount = ()=>{
    const {token, setSession} = useSession()
    return useMutation({
    mutationFn: async()=>{
        await userApi(token).delete<Session>(`User/delete-account`).then((res)=>{
            setSession(DEFAULT_SESSION)
            Toast.show({
                type:'success',
                text1:'تمت العملية بنجاح',
                text2:'تم حذف حسابك بنجاح'
            })        
        }).catch((err)=>{
            Toast.show({
                type:'error',
                text1:'خطأ',
                text2:err.response.data
            })
        })
    }
})}