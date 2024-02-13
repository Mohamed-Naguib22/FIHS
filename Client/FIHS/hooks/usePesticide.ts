import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const usePesticide = (name: string) => useQuery<Pesticide>({
    queryKey:['pesticide', name],
    queryFn:()=>api.get<Pesticide>(`/api/Pesticide/GetByName/${name}`).then((res)=>res.data)
    
})
export default usePesticide

export const usePesticides = () => useQuery<Pesticide[]>({
    queryKey:['pesticide'],
    queryFn:()=>api.get<Pesticide[]>("/api/Pesticide").then((res)=>res.data)
    
})

