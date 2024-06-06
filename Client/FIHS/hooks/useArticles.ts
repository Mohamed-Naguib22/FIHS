import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import { RefreshToken } from './useLogin'

const useArticles = () => {

    return useMutation({
        mutationFn: async ({ topic, amount = 10 }: { topic: string, amount: number }) => api.get<ArticleCard[]>(`/Article/search?topic=${topic}&num=${amount}`).then((res) => res.data)
    })
}
export default useArticles


export const useTopics = () => useQuery({
    queryKey: ['articles-topics'],
    queryFn: () => api.get<ArticleTopic[]>('/Article/get-topics').then((res) => res.data)
})


export const PostTopic = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async (data: { name: string }) => {
            return userApi(token, await localRt).post(`/Article/add-topic`, data).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['articles-topics'] })
            }).catch((err: AxiosError) => {
                Toast.show({
                    type: 'error',
                    text2: err.response?.data as string,
                    text1: "حدث خطأ ما"
                })
                if (err.response?.status === 401) {
                    refresh.mutate()
                }
            })
        }
    })
}

export const DeleteTopic = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Article/delete-topic/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['articles-topics'] })
            }).catch((err) => {
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
