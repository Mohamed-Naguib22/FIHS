import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import Toast from 'react-native-toast-message'

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