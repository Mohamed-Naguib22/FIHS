import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const usePlantType = (name: string) => useQuery<PlantType>({
    queryKey: ['plantTypes', name],
    queryFn: () => api.get<PlantType>(`/PlantType/GetPlantTypeByName/${name}`).then((res) => res.data)

})
export default usePlantType

export const usePlantTypes = () => useQuery<PlantType[]>({
    queryKey: ['plantTypes'],
    queryFn: () => api.get<PlantType[]>("/PlantType/GetAllPlantTypes").then((res) => res.data)

})

