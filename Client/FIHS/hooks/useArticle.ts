import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import Toast from 'react-native-toast-message'
const useArticle = (id: string) => {

    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useQuery<ArticleByID>({

        queryKey: ['articles', id],
        queryFn: async () => userApi(token, await localRt).get<ArticleByID>(`/Article/get/${id}`).then((res) => res.data)

    })
}
export default useArticle


export const UseLikeArticle = (id: number | string) => {
    const { token } = useSession()
    const queryClient = useQueryClient()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async () => userApi(token, await localRt).get(`/Article/like/${id}`).then((res) => {
            console.log(res.data)
            Toast.show({
                type: 'success',
                text1: 'تمت بنجاح',
                text2: res.data
            })
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: 'خطأ',
                text2: err.response.data
            })
        }),
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ['articles', id],
            })
        },
    })
}