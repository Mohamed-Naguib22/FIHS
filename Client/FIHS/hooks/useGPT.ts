import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const useGPT = () => useMutation({
    mutationKey: ['gpt'],
    mutationFn: async ({ question }: { question: string }): Promise<GPT_Response> => {
        const fd = new FormData()
        fd.append('Question', question)
        return await api.post<GPT_Response>(`/ChatGPT/ask`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => res.data)
    }


})
export default useGPT