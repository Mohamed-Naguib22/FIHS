import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
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

