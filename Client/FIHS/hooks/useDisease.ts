import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
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


