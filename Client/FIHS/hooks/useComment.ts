import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import Toast from 'react-native-toast-message'
import useSession from './state/useSession'
import { ICommentForm } from '@/models/CommentForm'
import storage from '@/utils/storage'
import { RefreshToken } from './useLogin'

export const useComments = (entityId: TComment['entityId'], entityType: TComment['entityType']) => {

    return useQuery<TComment[]>({
        queryKey: ['comments', entityType, entityId],
        queryFn: async () => {
            return api.get<TComment[]>(`/Comment/GetAllComments?entityId=${entityId}&entityType=${entityType}`).then((res) => res.data)
        }
    })
}
export default useComments


export type FinalComment = ICommentForm['entityType'] extends infer T extends string ? { [K in keyof ICommentForm as K extends 'entityId' ? Capitalize<`${T}Id`> : Capitalize<K>]: ICommentForm[K] } : never

export const PostComment = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()

    return useMutation({
        mutationFn: async (vals: FinalComment) => {

            return userApi(token, await localRt).post(`/Comment/AddComment`, vals).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data.message ?? res.data.msg ?? res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['comments', vals.EntityType] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data.message ?? err.response.data.msg ?? err.response.data,
                    text1: "حدث خطأ ما"
                })
                if (err.response?.status === 401) {
                    refresh.mutate()
                }
            })
        }
    })
}

export const UpdateComment = () => {
    const { token } = useSession()
    const refresh = RefreshToken()

    return useMutation({
        mutationFn: async ({ id, vals }: { id: TComment['id'], vals: Partial<FinalComment> }) => {
            return userApi(token).post(`/Comment/EditComment/${id}`, vals).then((res) => Toast.show({
                type: 'success',
                text2: res.data,
                text1: "تمت بنجاح"
            })).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data,
                    text1: "حدث خطأ ما"
                })
                if (err.response?.status === 401) {
                    refresh.mutate()
                }
            })
        }
    })
}

export const DeleteComment = () => {
    const { token } = useSession()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: TComment['id'] }) => {
            return userApi(token).delete(`/Comment/DeleteComment/${id}`).then((res) => Toast.show({
                type: 'success',
                text2: res.data,
                text1: "تمت بنجاح"
            })).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data,
                    text1: "حدث خطأ ما"
                })
                if (err.response?.status === 401) {
                    refresh.mutate()
                }
            })
        }
    })
}