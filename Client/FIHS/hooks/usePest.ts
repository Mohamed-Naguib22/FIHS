import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import storage from '@/utils/storage'
import Toast from 'react-native-toast-message'
import { Pest as TPestForm } from '@/models/Pest'
import ConvertImg from '@/utils/ConvertImg'
import { ImagePickerAsset } from 'expo-image-picker'
import { RefreshToken } from './useLogin'
export const usePest = (id: string) => useQuery<Pest>({
    queryKey: ['pests', id],
    queryFn: () => api.get<Pest>(`/Pest/GetPestById/${id}`).then((res) => res.data)

})
export default usePest

export const usePests = (amount: number = 10) => useInfiniteQuery<Paginate<Pest, 'pests'>>({
    queryKey: ['pests'],
    queryFn: ({ pageParam }) => api.get<Paginate<Pest, 'pests'>>(`/Pest/GetAllPests?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

export const PostPest = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async (data: TPestForm) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("ScientificName", data.scientificName)
            fd.append("Species", data.species)
            fd.append("Description", data.description)
            fd.append("Reproduction", data.reproduction)
            fd.append("ControlMethods", data.controlMethods)
            fd.append("DamageSymptoms", data.damageSymptoms)
            fd.append("GeographicDistribution", data.geographicDistribution)
            fd.append("LifeCycle", data.lifeCycle)
            fd.append("Image", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).post(`/Pest/AddPest`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pests'] })
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

export const UpdatePest = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id, data }: { id: Pest['id'], data: TPestForm }) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("ScientificName", data.scientificName)
            fd.append("Species", data.species)
            fd.append("Description", data.description)
            fd.append("Reproduction", data.reproduction)
            fd.append("ControlMethods", data.controlMethods)
            fd.append("DamageSymptoms", data.damageSymptoms)
            fd.append("GeographicDistribution", data.geographicDistribution)
            fd.append("LifeCycle", data.lifeCycle)
            typeof data.image != "string" && fd.append("Image", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).put(`/Pest/UpdatePest/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pests'] })
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


export const DeletePest = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Pest/DeletePest/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['pests'] })
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

