import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const useDisease = (id: string) => useQuery<Disease>({
    queryKey: ['disease', id],
    queryFn: () => api.get<Disease>(`/Disease/GetDiseaseById/${id}`).then((res) => res.data)

})
export default useDisease

export const useDiseases = () => useQuery<Disease[]>({
    queryKey: ['disease'],
    queryFn: () => api.get<Disease[]>("/Disease/GetAllDiseases").then((res) => res.data)

})

