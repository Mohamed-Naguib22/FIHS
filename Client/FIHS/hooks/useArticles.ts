import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
const useArticles = () => useQuery<Article[]>({
    queryKey:['articles'],
    queryFn:()=>api.get<Article[]>("/Article/get-all").then((res)=>res.data)
    
})
export default useArticles

export const useSearch = (value: string) => useQuery<Article[]>({
    queryKey:['articles'],
    queryFn:()=>api.get<Article[]>("/Article/get-all/search", {params:{query: value}}).then((res)=>res.data)
    
})
