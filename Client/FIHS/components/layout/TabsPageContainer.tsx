import React, { useEffect } from 'react'
import { Fab, ScrollView, View } from '@gluestack-ui/themed'
import { useTabHeaderHeight } from './useTabHeaderHeight'
import Fontisto from '@expo/vector-icons/Fontisto'

type Props = {
    children: React.ReactNode
}

const TabsPageContainer = ({children}: Props) => {
    const {heightWithoutSearch, heightWithSearch} = useTabHeaderHeight()  
    useEffect(()=>{
        heightWithSearch()
    },[])
    return (
        <>
            <ScrollView
            onScrollEndDrag={(e)=>{
            e.nativeEvent.contentOffset.y/e.nativeEvent.contentSize.height>0.1?heightWithoutSearch():heightWithSearch()
            }}
            >
            <View p={"$5"}>
                {
                    children
                }
            </View>

            </ScrollView>
            <Fab position='absolute' right={"unset" as any} left={"$4"} bottom={"$5"} >
                <Fontisto name='reddit' size={32} color={"white"}/>
            </Fab>
        </>
    )
}

export default TabsPageContainer