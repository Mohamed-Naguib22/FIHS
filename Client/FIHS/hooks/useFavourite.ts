import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
import Toast from 'react-native-toast-message'
export const useFavourite = (favouriteId: string) => useQuery<FullPlant>({
    queryKey: ['favourite', favouriteId],
    queryFn: () => api.get<FullPlant>(`/Favourite/GetAllFavouritePlants/${favouriteId}`).then((res) => res.data)

})
export default useFavourite

export const PostFavourite = () => useMutation({
    mutationFn: async (vals: Favourite) => {
        return api.post(`/Favourite/AddFavouritePlant`, vals).then((res) => Toast.show({
            type: 'success',
            text2: res.data.message,
            text1: "تمت بنجاح"
        }))
    }
})


export const DeleteFavourite = () => useMutation({
    mutationFn: async (vals: Favourite) => {
        return api.post(`/Favourite/DeleteItemFromFavourite`, vals).then((res) => Toast.show({
            type: 'success',
            text2: res.data.message,
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

