import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const usePlantType = (name: string) => useQuery<PlantType>({
    queryKey: ['plantTypes', name],
    queryFn: () => api.get<PlantType>(`/PlantType/GetPlantTypeByName/${name}`).then((res) => res.data)

})
export default usePlantType

export const usePlantTypes = (amount: number = 10) => useInfiniteQuery<Paginate<PlantType, 'plantTypes'>>({
    queryKey: ['plantTypes'],
    queryFn: ({ pageParam }) => api.get<Paginate<PlantType, 'plantTypes'>>(`/PlantType/GetAllPlantTypes?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage > 0 ? lastPage.nextPage : undefined
})


export const usePlantTypesStatic = (amount: number = 6) => useQuery<Paginate<PlantType, 'plantTypes'>>({
    queryKey: ['staticPlantTypes'],
    queryFn: () => api.get<Paginate<PlantType, 'plantTypes'>>(`/PlantType/GetAllPlantTypes?offset=1&limit=${amount}`).then((res) => res.data),
})

