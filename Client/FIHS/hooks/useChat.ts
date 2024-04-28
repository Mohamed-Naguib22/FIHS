import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
export const useGemini = () => useMutation({
    mutationKey: ['chat'],
    mutationFn: async ({ question }: { question: string }): Promise<ChatResponse> => {
        const fd = new FormData()
        fd.append('Question', question)
        return await api.post<ChatResponse>(`/Chatbot/gemini`, fd, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => res.data)
    }


})
export default useGemini