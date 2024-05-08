import { mlApi } from "@/utils/api"
import { useMutation } from "@tanstack/react-query"

export const useRecommendCrops = () => useMutation({
    mutationFn: async (vals: CropsRecommendedInput) => {
        return mlApi.post<CropsRecommended>("/recommend", vals).then((res) => res.data)
    }
})