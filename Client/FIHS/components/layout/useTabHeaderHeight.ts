import { SharedValue, useSharedValue } from 'react-native-reanimated'
import {create} from 'zustand'

interface TabHeader {
    isTop: boolean
    heightWithSearch: ()=>void,
    heightWithoutSearch: ()=>void,
}

export const  useTabHeaderHeight = create<TabHeader>((set)=>({
    isTop:true,
    heightWithoutSearch: ()=> set((state)=>(
        {isTop:state.isTop? state.isTop = false : state.isTop }
        )),
    heightWithSearch: ()=> set((state)=>(
        {isTop:!state.isTop? state.isTop = true : state.isTop }
        )),
}))