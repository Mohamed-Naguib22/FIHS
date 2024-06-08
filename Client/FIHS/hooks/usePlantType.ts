import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import ConvertImg from '@/utils/ConvertImg'
import { ImagePickerAsset } from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import { RefreshToken } from './useLogin'
export const usePlantType = (name: string) => useQuery<PlantType>({
    queryKey: ['plantTypes', name],
    queryFn: () => api.get<PlantType>(`/PlantType/GetPlantTypeByName/${name}`).then((res) => res.data)

})
export default usePlantType

export const usePlantTypes = (amount: number = 10) => useInfiniteQuery<Paginate<PlantType, 'plantTypes'>>({
    queryKey: ['plantTypes'],
    queryFn: ({ pageParam }) => api.get<Paginate<PlantType, 'plantTypes'>>(`/PlantType/GetAllPlantTypes?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : undefined
})


export const usePlantTypesStatic = (amount: number = 6) => useQuery<Paginate<PlantType, 'plantTypes'>>({
    queryKey: ['staticPlantTypes'],
    queryFn: () => api.get<Paginate<PlantType, 'plantTypes'>>(`/PlantType/GetAllPlantTypes?offset=1&limit=${amount}`).then((res) => res.data),
})

export type TPostPlantType = Omit<{ [K in keyof PlantType as K extends 'imgURL' ? 'Image' : Capitalize<K>]: PlantType[K] }, 'Id'>
export const PostPlantType = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async (data: TPostPlantType) => {
            const fd = new FormData()
            Object.keys(data).map((k) => {
                if (k === 'Image') {
                    fd.append("Image", ConvertImg((data[(k as keyof typeof data)] as string) as unknown as ImagePickerAsset) as any)
                } else {
                    fd.append(k, data[(k as keyof typeof data)] as string)
                }
            })
            return userApi(token, await localRt).post(`/Plant/AddPlantType`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['plants-types'] })
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

export const DeletePlantType = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Plant/DeletePlantType/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['plants-types'] })
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

