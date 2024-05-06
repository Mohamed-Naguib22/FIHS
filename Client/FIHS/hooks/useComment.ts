import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
import Toast from 'react-native-toast-message'

export const useComments = (entityId: TComment['EntityId'], entityType: TComment['EntityType']) => useQuery<Comment[]>({
    queryKey: ['comment', entityType, entityId],
    queryFn: () => api.get<Comment[]>(`/Comment/GetAllComments?entityId=${entityId}&entityType=${entityType}`).then((res) => res.data)

})
export default useComments


export const PostComment = () => useMutation({
    mutationFn: async (vals: Partial<TComment>) => {
        return api.post(`/Comment/AddComment`, vals).then((res) => Toast.show({
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

export const UpdateComment = () => useMutation({
    mutationFn: async ({ id, vals }: { id: TComment['id'], vals: Partial<TComment> }) => {
        return api.post(`/Comment/EditComment/${id}`, vals).then((res) => Toast.show({
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

export const DeleteComment = () => useMutation({
    mutationFn: async (id: TComment['id']) => {
        return api.delete(`/Comment/DeleteComment/${id}`).then((res) => Toast.show({
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

