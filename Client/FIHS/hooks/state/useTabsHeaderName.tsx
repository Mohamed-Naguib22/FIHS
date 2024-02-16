import { create } from "zustand";


interface HeaderName {
    name: string,
    setName: (name: string)=>void
}

const useTabsHeaderName = create<HeaderName>((set)=>({
    name:'الرئيسية',
    setName:(name: string)=>set((state)=>{
        return {
            name:name
        }
    })
}))
export default useTabsHeaderName