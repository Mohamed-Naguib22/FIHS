import React, { useState } from 'react'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, Button, ButtonText, HStack, VStack } from '@gluestack-ui/themed'
import { ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed'
import { ActionsheetDragIndicator } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons'
import {Camera, CameraType} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
type Props = {}

const Scan = (props: Props) => {
    const [showActionsheet, setShowActionsheet] = useState(false)
    return<>
    <Actionsheet isOpen={showActionsheet} onClose={()=>setShowActionsheet(!showActionsheet)} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
        <HStack gap={"$5"} h={"$full"} alignItems='center' justifyContent='center'>
            <Button variant='outline' rounded={"$2xl"} w={175} h={175} onPress={()=>setShowActionsheet(!showActionsheet)}>
                <VStack gap={"$0.5"} alignItems='center'>
                <Image
                    style={{width:125, height:125, objectFit:'cover'}}
                    source={require("@/assets/images/identify-plant.png")}
                />
            <ButtonText>التعرف علي النبات</ButtonText>
            </VStack>
            </Button>
            <Button variant='outline'rounded={"$2xl"} w={175} h={175} onPress={()=>setShowActionsheet(!showActionsheet)}>
                <VStack gap={"$0.5"} alignItems='center'>
                    <Image
                        style={{width:125, height:125, objectFit:'cover'}}
                        source={require("@/assets/images/idnetify-disease.png")}
                    />
                    <ButtonText>تحديد مرض النبات</ButtonText>
                </VStack>
            </Button>
        </HStack>
        </ActionsheetContent>
    </Actionsheet>
    <Button onPress={()=>setShowActionsheet(!showActionsheet)} h={65} w={65} px={"$0"} py={"$0"} transform={"translateY(8px)"} rounded={"$2xl"}>
        <Feather name='camera' color={"white"} size={28}/>
    </Button>
    </>
}

export default Scan