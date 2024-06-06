import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession'
import Toast from 'react-native-toast-message'
import storage from '@/utils/storage'
import { Disease as DiseaseForm } from '@/models/disease'
import ConvertImg from '@/utils/ConvertImg'
import { ImagePickerAsset } from 'expo-image-picker'
import { RefreshToken } from './useLogin'
export const useDisease = (id: string) => useQuery<Disease>({
    queryKey: ['disease', id],
    queryFn: () => api.get<Disease>(`/Disease/GetDiseaseById/${id}`).then((res) => res.data)

})
export default useDisease

export const useDiseases = (amount: number = 10) => useInfiniteQuery<Paginate<Disease, 'diseases'>>({
    queryKey: ['disease'],
    queryFn: ({ pageParam }) => api.get<Paginate<Disease, 'diseases'>>(`/Disease/GetAllDiseases?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

export const PostDisease = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async (data: DiseaseForm) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("ScientificName", data.scientificName)
            fd.append("Species", data.species)
            fd.append("Description", data.description)
            fd.append("Treatments", data.treatments)
            fd.append("Symptoms", data.symptoms)
            fd.append("Causes", data.causes)
            fd.append("PreventionMethods", data.preventionMethods)
            fd.append("Image", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).post(`/Disease/AddDisease`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['disease'] })
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

export const UpdateDisease = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id, data }: { id: Disease['id'], data: DiseaseForm }) => {
            const fd = new FormData()
            fd.append("Name", data.name)
            fd.append("ScientificName", data.scientificName)
            fd.append("Species", data.species)
            fd.append("Description", data.description)
            fd.append("Treatments", data.treatments)
            fd.append("Causes", data.causes)
            fd.append("Symptoms", data.symptoms)
            fd.append("PreventionMethods", data.preventionMethods)
            typeof data.image != "string" && fd.append("Image", ConvertImg(data.image as ImagePickerAsset) as any)
            return userApi(token, await localRt).put(`/Disease/UpdateDisease/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['disease'] })
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

export const DeleteDisease = () => {
    const { token } = useSession()
    let localRt = storage.load<string>({
        key: 'refreshToken'
    })
    const queryClient = useQueryClient()
    const refresh = RefreshToken()
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            return userApi(token, await localRt).delete(`/Disease/DeleteDisease/${id}`).then((res) => {
                Toast.show({
                    type: 'success',
                    text2: res.data,
                    text1: "تمت بنجاح"
                })
                queryClient.invalidateQueries({ queryKey: ['disease'] })
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
