import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import Toast from 'react-native-toast-message'
import storage from '@/utils/storage'
import useSession from './state/useSession'
export const useFavourite = () => {
    const { token, favouriteId } = useSession()
    return useQuery({
        queryKey: ['favourite', favouriteId],
        queryFn: () => userApi(token).get<FavouriteResponse[]>(`/Favourite/GetAllFavouritePlants/${favouriteId}`).then((res) => {
            console.log(res.data)
            return res.data
        })
    })
}
export default useFavourite

export const PostFavourite = () => {
    const queryClient = useQueryClient()
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    return useMutation({
        mutationFn: async (vals: Favourite) => {
            return userApi(token, await localRt).post(`/Favourite/AddFavouritePlant`, vals).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data.message,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['favourite', vals.favouriteId] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data.message,
                    text1: "حدث خطأ ما"
                })
            })
        }
    })
}


export const DeleteFavourite = () => {
    const queryClient = useQueryClient()
    const { token } = useSession()
    return useMutation({
        mutationFn: async ({ vals }: { vals: Favourite }) => userApi(token).delete(`/Favourite/DeleteItemFromFavourite?FavoriteId=${vals.favouriteId}&plantId=${vals.plantId}`).then((res) => {
            Toast.show({
                type: 'success',
                text2: res.data.message,
                text1: "تمت بنجاح"
            });
            queryClient.refetchQueries({ queryKey: ['favourite', vals.favouriteId] })
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text2: err.response.data.message,
                text1: "حدث خطأ ما"
            })
        })
    })
}

