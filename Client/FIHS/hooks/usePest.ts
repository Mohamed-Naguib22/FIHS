import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const usePest = (id: string) => useQuery<Pest>({
    queryKey: ['pests', id],
    queryFn: () => api.get<Pest>(`/Pest/GetPestById/${id}`).then((res) => res.data)

})
export default usePest

export const usePests = () => useQuery<Pest[]>({
    queryKey: ['pests'],
    queryFn: () => api.get<Pest[]>("/Pest/GetAllPests").then((res) => res.data)

})

