import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import { Fertilizer as FertilizerForm } from '@/models/Fertilizer'
import Toast from 'react-native-toast-message'
import ConvertImg from '@/utils/ConvertImg'
import { ImagePickerAsset } from 'expo-image-picker'

export const useFertilizer = (name: string) => useQuery<Fertilizer>({
    queryKey: ['fertilizer', name],
    queryFn: () => api.get<Fertilizer>(`/api/Fertilizer/GetByName/${name}`).then((res) => res.data)

})
export default useFertilizer

export const useFertilizers = (amount: number = 10) => useInfiniteQuery<Paginate<Fertilizer, 'fertilizers'>>({
    queryKey: ['fertilizers'],
    queryFn: ({ pageParam }) => api.get<Paginate<Fertilizer, 'fertilizers'>>(`/Fertilizer?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

export const PostFertilizer = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: FertilizerForm) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("Manufactuer", data.manufactuer)
            fd.append("UsageInstructions", data.usageInstructions)
            fd.append("ImageURL", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).post(`/Fertilizer`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['fertilizers'] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data,
                    text1: "حدث خطأ ما"
                })
            })
        }
    })
}

export const UpdateFertilizer = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: Disease['id'], data: FertilizerForm }) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("Manufactuer", data.manufactuer)
            fd.append("UsageInstructions", data.usageInstructions)
            typeof data.image != "string" && fd.append("ImageURL", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).put(`/Fertilizer/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['fertilizers'] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data,
                    text1: "حدث خطأ ما"
                })
            })
        }
    })
}


export const DeleteFertilizer = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Fertilizer/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['fertilizers'] })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text2: err.response.data,
                    text1: "حدث خطأ ما"
                })
            })
        }
    })
}


