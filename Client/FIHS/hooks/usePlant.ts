import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession';
import storage from "@/utils/storage";
import Toast from "react-native-toast-message";
import ConvertImg from "@/utils/ConvertImg";
import { ImagePickerAsset } from "expo-image-picker";
import { RefreshToken } from './useLogin';

export const usePlant = (id: string) => {
    const { favouriteId, token } = useSession();
    return useQuery<FullPlant>({
        queryKey: ['plants', id],
        queryFn: () => userApi(token).get<FullPlant>(`/Plant/GetPlantById/${id}?favId=${favouriteId}`).then((res) => {
            return res.data
        })

    })
}
export default usePlant

export const usePlants = (id: string, amount: number = 10) => useInfiniteQuery<Paginate<Plant, 'plant'>>({
    queryKey: ['plants-types', id],
    queryFn: ({ pageParam }) => api.get<Paginate<FullPlant, 'plant'>>(`/Plant/GetAllPlants?plantTypeId=${id}&offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

export const PostPlant = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async (data: Omit<{ [K in keyof Plant as Capitalize<K>]: Plant[K] }, 'Id'> & { PlantTypesId: string, SoilsId: string }) => {
            const fd = new FormData()
            Object.keys(data).map((k) => {
                if (k === 'ImgFile') {
                    fd.append("ImgFile", ConvertImg((data[(k as keyof typeof data)] as string) as unknown as ImagePickerAsset) as any)
                } else {
                    fd.append(k, data[(k as keyof typeof data)] as string)
                }
            })
            return userApi(token, await localRt).post(`/Plant/AddPlant`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['plants'] })
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

export const DeletePlant = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Plant/DeletePlant/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['plants'] })
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



export const useAllPlantTypes = useQuery<PlantType[]>({
    queryKey: ['all-plant-types'],
    queryFn: () => api.get<PlantType[]>(`/Plant/AllPlantTypes`).then((res) => res.data)
})

export const useSoils = useQuery<Soil[]>({
    queryKey: ['soils'],
    queryFn: () => api.get<Soil[]>(`/Plant/AllSoils`).then((res) => res.data)
})