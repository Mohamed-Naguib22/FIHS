import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const usePlant = (id: string) => useQuery<FullPlant>({
    queryKey: ['plants', id],
    queryFn: () => api.get<FullPlant>(`/Plant/GetPlantById/${id}`).then((res) => res.data)

})
export default usePlant

export const usePlants = (id: string, amount: number = 10) => useInfiniteQuery<Paginate<Plant, 'plant'>>({
    queryKey: ['plants-types', id],
    queryFn: ({ pageParam }) => api.get<Paginate<FullPlant, 'plant'>>(`/Plant/GetAllPlants?plantTypeId=${id}&offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : null
})

