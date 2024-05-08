import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/utils/api'
import Toast from 'react-native-toast-message'
import useSession from './state/useSession'
import { ICommentForm } from '@/models/CommentForm'
import storage from '@/utils/storage'

export const useComments = (entityId: TComment['entityId'], entityType: TComment['entityType']) => {

    const { token } = useSession()

    return useQuery<TComment[]>({
        queryKey: ['comments', entityType, entityId],
        queryFn: async () => {
            return userApi(token).get<TComment[]>(`/Comment/GetAllComments?entityId=${entityId}&entityType=${entityType}`).then((res) => res.data)
        }
    })
}
export default useComments


export const PostComment = () => {
    const { token, setSession } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (vals: ICommentForm) => {

            return userApi(token, await localRt).post(`/Comment/AddComment`, vals).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data.message ?? res.data.msg ?? res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['comments', vals.entityType, vals.entityId] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data.message ?? err.response.data.msg ?? err.response.data,
                    text1: "حدث خطأ ما"
                })
            })
        }
    })
}

export const UpdateComment = () => {
    const { token } = useSession()

    return useMutation({
        mutationFn: async ({ id, vals }: { id: TComment['id'], vals: Partial<TComment> }) => {
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
            })
        }
    })
}

export const DeleteComment = () => {
    const { token } = useSession()
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
            })
        }
    })
}