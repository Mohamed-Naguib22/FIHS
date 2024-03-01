import { create } from "zustand";


interface Session {
    isLoading: boolean,
    token: string | null,
    setLoading: (status: boolean)=>void,
    setToken: (newToken: string)=>void
}

const useSession = create<Session>((set)=>({
    isLoading:false,
    token:null,
    setLoading:(status: boolean)=>set((state)=>{
        return {
            isLoading:status
        }
    }),
    setToken:(newToken)=>set((state)=>{
        return {
            token:newToken
        }
    }),
}))
export default useSession