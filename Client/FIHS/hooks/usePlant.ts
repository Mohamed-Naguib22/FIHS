import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api, { userApi } from '@/utils/api'
import useSession from './state/useSession';
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

