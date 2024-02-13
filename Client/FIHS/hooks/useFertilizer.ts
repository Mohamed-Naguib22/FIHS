import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const useFertilizer = (name: string) => useQuery<Fertilizer>({
    queryKey:['fertilizer', name],
    queryFn:()=>api.get<Fertilizer>(`/api/Fertilizer/GetByName/${name}`).then((res)=>res.data)
    
})
export default useFertilizer

export const useFertilizers = () => useQuery<Fertilizer[]>({
    queryKey:['fertilizer'],
    queryFn:()=>api.get<Fertilizer[]>("/api/Fertilizer").then((res)=>res.data)
    
})

