import { useMutation } from '@tanstack/react-query'
import api from '@/utils/api'
export const useSearch = () => useMutation({
    mutationKey: ['search'],
    mutationFn: async ({ term }: { term: string }): Promise<FullPlant[]> =>
        await api.get<FullPlant[]>(`/Plant/SearchPlant?searchText=${term}`)
            .then((res) => res.data)

})
export default useSearch