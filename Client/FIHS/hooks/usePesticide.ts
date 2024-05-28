import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import Toast from 'react-native-toast-message'
import { Pesticide as PesticideForm } from '@/models/Pesticide'
import ConvertImg from '@/utils/ConvertImg'
import { ImagePickerAsset } from 'expo-image-picker'
export const usePesticide = (name: string) => useQuery<Pesticide>({
    queryKey: ['pesticides', name],
    queryFn: () => api.get<Pesticide>(`/api/Pesticide/GetByName/${name}`).then((res) => res.data)

})
export default usePesticide

export const usePesticides = (amount: number = 10) => useInfiniteQuery<Paginate<Pesticide, 'pesticides'>>({
    queryKey: ['pesticides'],
    queryFn: ({ pageParam }) => api.get<Paginate<Pesticide, 'pesticides'>>(`/Pesticide?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

export const PostPesticide = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: PesticideForm) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("Description", data.description)
            fd.append("Type", data.type)
            fd.append("Toxicity", data.toxicity)
            fd.append("ScientificName", data.manufactuer)
            fd.append("UsageInstructions", data.usageInstructions)
            fd.append("ImageURL", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).post(`/Pesticide`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pesticides'] })
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

export const UpdatePesticide = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: Disease['id'], data: PesticideForm }) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("Description", data.description)
            fd.append("Type", data.type)
            fd.append("Toxicity", data.toxicity)
            fd.append("ScientificName", data.manufactuer)
            fd.append("UsageInstructions", data.usageInstructions)
            typeof data.image != "string" && fd.append("ImageURL", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).put(`/Pesticide/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pesticides'] })
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

export const DeletePesticide = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Pesticide/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pesticides'] })
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