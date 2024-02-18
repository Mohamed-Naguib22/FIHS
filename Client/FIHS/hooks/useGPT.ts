import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const useGPT = () => useMutation({
    mutationKey:['gpt'],
    mutationFn: async({question}:{question: string}): Promise<GPT_Response>=> 
    await api.post<GPT_Response>(`/api/ChatGPT/ask`, {Question:question}).then((res)=>res.data)
    
    
})
export default useGPT