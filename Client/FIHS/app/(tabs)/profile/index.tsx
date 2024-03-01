import TabsPageContainer from '@/components/layout/TabsPageContainer';
import ScreenHeader from '@/components/layout/ScreenHeader';
import { Avatar, AvatarFallbackText,Text, AvatarImage, VStack, HStack, Input, InputField, Button, ActionsheetContent, ActionsheetDragIndicator, ButtonText } from '@gluestack-ui/themed';
import { FontAwesome } from '@expo/vector-icons';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import ResetPasswordForm from '@/components/profile/ResetPasswordForm';
import DeleteAccount from '@/components/profile/DeleteAccount';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Actionsheet } from '@gluestack-ui/themed';
import { ActionsheetBackdrop } from '@gluestack-ui/themed';
import { ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed';
import useSession from '@/hooks/state/useSession';

export default function ProfileScreen() {
  const [showActionsheet, setShowActionsheet] = useState(false)
  const {imgUrl} = useSession()
  return (
    <>
    <TabsPageContainer>
      <ScreenHeader name='صفحتي الشخصية'>
      <VStack gap={"$1.5"} my={"$5"}>
        <VStack alignItems='center' gap={"$0.5"}>
          <TouchableOpacity onPress={()=>setShowActionsheet(true)}>
          <Avatar size='xl' alignSelf='center'>
            <AvatarFallbackText>يوسف محمد</AvatarFallbackText>
            <AvatarImage alt='يوسف محمد' source={imgUrl||require('@/assets/images/avatar.png')}/>
          </Avatar>
          </TouchableOpacity>        
          <HStack gap={"$1"}>
          <Text size='xs' fontWeight='$bold' color='$textDark500'>
            <FontAwesome name='info-circle'/>
          </Text>
          <Text size='xs' fontWeight='$bold' color='$textDark500'>
            إضغط لتعديل او حذف الصورة
          </Text>
          </HStack>
        </VStack>
        <PersonalInfoForm/>
        <ResetPasswordForm/>
        <DeleteAccount/>
      </VStack>
      </ScreenHeader>
    </TabsPageContainer>
    <Actionsheet isOpen={showActionsheet} onClose={()=>setShowActionsheet(!showActionsheet)} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
        <HStack gap={"$5"} h={"$full"} alignItems='center' justifyContent='center'>
            <Button variant='outline' rounded={"$2xl"} w={175} h={175} onPress={()=>setShowActionsheet(!showActionsheet)}>
                <VStack gap={"$0.5"} alignItems='center'>
                    <ButtonText size='3xl'>
                      <FontAwesome size={40} name='edit'/>
                    </ButtonText>
                    <ButtonText fontWeight='bold' size='xl'>تغيير</ButtonText>
                </VStack>
            </Button>
            <Button variant='outline'rounded={"$2xl"} borderColor='$red500' w={175} h={175} onPress={()=>setShowActionsheet(!showActionsheet)}>
                <VStack gap={"$0.5"} alignItems='center'>
                    <ButtonText size='3xl' color='$red500'>
                      <FontAwesome size={40} name='trash'/>
                    </ButtonText>
                    <ButtonText fontWeight='bold' size='xl' color='$red500'>حذف</ButtonText>
                </VStack>
            </Button>
        </HStack>
        </ActionsheetContent>
    </Actionsheet>
    </>
  );
}
