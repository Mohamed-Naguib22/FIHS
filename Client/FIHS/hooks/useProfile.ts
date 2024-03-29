import { useMutation, useQuery } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import { ResetPassword } from '@/models/ResetPassword'
import useSession, { DEFAULT_SESSION } from './state/useSession'
import Toast from 'react-native-toast-message'
import { PersonalInfo } from '@/models/PersonalInfo'
import storage from '../utils/storage'
import { useRouter } from 'expo-router'
export const useProfile = () => useQuery<Session>({
    queryKey:['profile'],
    queryFn:()=>api.get<Session>(`User/profile`).then((res)=>res.data)
    
})
export default useProfile



export const UpdateProfile = ()=>{
    const {token, setSession} = useSession()
    let localRt = storage.load<string>({
        key:'refreshToken'
    })
    return useMutation({
    mutationFn: async(vals: PersonalInfo)=>
    await userApi(token, await localRt).put<Session>(`User/update-profile`, {firstName: vals.firstName, lastName: vals.lastName, phoneNumber:vals.phoneNumber}).then((res)=>{
        setSession(res.data)
        let rt = res.headers['set-cookie']?.[0]
        storage.save({
            key:'refreshToken',
            data:rt
        })
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
    let localRt = storage.load<string>({
        key:'refreshToken'
    })
    return useMutation({
    mutationFn: async(vals: ResetPassword)=>{
        await userApi(token, await localRt).put<Session>(`Auth/change-password`, vals).then((res)=>{
            setSession(res.data)
            let rt = res.headers['set-cookie']?.[0]
            storage.save({
                key:'refreshToken',
                data:rt
            })
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
    let localRt = storage.load<string>({
        key:'refreshToken'
    })
    return useMutation({
    mutationFn: async({img}: {img:File})=>{
        let fd = new FormData()
        fd.append('imgFile', img)
        await userApi(token, await localRt).post<Session>(`User/set-image`, fd, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            console.log(res);
            
            setSession(res.data)
            let rt = res.headers['set-cookie']?.[0]
            storage.save({
                key:'refreshToken',
                data:rt
            })
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
            console.log(err.response.data);
            
        })
    }
})}



export const DeleteProfileImg = ()=>{
    const {token, setSession} = useSession()
    let localRt = storage.load<string>({
        key:'refreshToken'
    })
    return useMutation({
    mutationFn: async()=>{
        await userApi(token, await localRt).delete<Session>(`User/delete-image`).then((res)=>{
            setSession(res.data)
            let rt = res.headers['set-cookie']?.[0]
            storage.save({
                key:'refreshToken',
                data:rt
            })
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


export const useDeleteAccount = ()=>{
    const {token, setSession} = useSession()
    const router = useRouter()
    let localRt = storage.load<string>({
        key:'refreshToken'
    })
    return useMutation({
    mutationFn: async()=>{
        await userApi(token, await localRt).delete<Session>(`User/delete-account`).then((res)=>{
            //@ts-ignore
            setSession(DEFAULT_SESSION)
            storage.remove({
                key:'refreshToken'
            })
            Toast.show({
                type:'success',
                text1:'تمت العملية بنجاح',
                text2:'تم حذف حسابك بنجاح'
            })        
            router.replace('/(auth)/login')
        }).catch((err)=>{
            Toast.show({
                type:'error',
                text1:'خطأ',
                text2:err.response.data
            })
        })
    }
})}