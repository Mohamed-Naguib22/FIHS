import { mlApi } from "@/utils/api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useRecommendCrops = () => useMutation({
    mutationFn: async (vals: CropsRecommendedInput) => {
        return mlApi.post<CropsRecommended>("/recommend", vals).then((res) => res.data)
    }
})


export const useCities = () => useQuery({
    queryKey: ['cities'],
    queryFn: () => mlApi.get<string[]>(`/getAllCities`).then((res) => res.data)
})


export const useMonths = () => useQuery({
    queryKey: ['months'],
    queryFn: () => mlApi.get<string[]>(`/getAllMonths`).then((res) => res.data)
})