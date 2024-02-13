import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
const useArticle = (id: number) => useQuery<ArticleByID>({
    queryKey:['articles', id],
    queryFn:()=>api.get<ArticleByID>(`/Article/get/${id}`).then((res)=>res.data)
    
})
export default useArticle