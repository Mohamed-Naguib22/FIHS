import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
const useArticles = (amount: number = 10) => useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: () => api.get<Record<"articles", Article[]>>(`/Article/get-all?limit=${amount}`).then((res) => res.data.articles)

})
export default useArticles

export const useInfiniteArticles = (amount: number = 10) => useInfiniteQuery<Paginate<Article, "articles">>({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) => api.get<Paginate<Article, "articles">>(`/Article/get-all?offset=${pageParam}&limit=${amount}`).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage

})

export const useSearch = (value: string) => useQuery<Paginate<Article, "articles">>({
    queryKey: ['articles'],
    queryFn: () => api.get<Paginate<Article, "articles">>("/Article/get-all/search", { params: { query: value } }).then((res) => res.data)

})
