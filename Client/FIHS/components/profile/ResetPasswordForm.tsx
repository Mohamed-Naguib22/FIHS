import React from 'react'
import {Formik} from 'formik'
import { Button, HStack, Text, VStack, View } from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import CustomInput from '@/components/profile/CustomInput';
import { Heading } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { ResetPassword, ResetPasswordSchema } from '@/models/ResetPassword';
import { UpdatePassword } from '@/hooks/useProfile';
import { FontAwesome } from '@expo/vector-icons';
import { InputField, Input } from '@gluestack-ui/themed';
type Props = {}

const ResetPasswordForm = (props: Props) => {
    const updatePassword = UpdatePassword()
    return (
        <Formik<ResetPassword>
        initialValues={{
            currentPassword:'',
            newPassword:''
        }}
        onSubmit={(vals, { resetForm })=>{
            console.log(vals);
            updatePassword.mutate(vals)
            resetForm()
        }}
        validationSchema={ResetPasswordSchema}
        >
        {({ setValues, handleBlur, submitForm, values, errors }) => (
        <FormControl
        px={"$5"} 
        mt={"$1"} 
        mb={"$1"}   
        py={"$5"}    
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        >
        <Heading color="$textDark900" size='md' lineHeight="$md">
        تغيير كلمة المرور
        </Heading>
        <VStack gap={"$5"} pt={"$2"} pb={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>كلمة المرور القديمة : </Text>
            <Input
                variant="outline"
                size="md"
                id={'currentPassword'}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField
                type={'password'}
                textAlign={'left'}
                direction='ltr' 
                onChangeText={(e)=>setValues({newPassword:values.newPassword, currentPassword:e})} 
                onBlur={handleBlur('currentPassword')} 
                defaultValue={values.currentPassword}
                />
            </Input>
            {
                  errors.currentPassword&& 
                  <HStack gap={'$1'} my={'$1.5'} mx={'$3'}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle'/>
                    </Text>
                    <Text size='xs' color='$red500'>{errors.currentPassword}</Text>
                  </HStack>
            }
        </View>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>كلمة المرور الجديدة : </Text>
            <Input
                variant="outline"
                size="md"
                id={'newPassword'}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField
                type={'password'}
                textAlign={'left'}
                direction='ltr' 
                onChangeText={(e)=>setValues({newPassword:e, currentPassword:values.currentPassword})} 
                onBlur={handleBlur('newPassword')} 
                defaultValue={values.newPassword}
                />
            </Input>
            {
                  errors.newPassword&& 
                  <HStack gap={'$1'} my={'$1.5'} mx={'$3'}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle'/>
                    </Text>
                    <Text size='xs' color='$red500'>{errors.newPassword}</Text>
                  </HStack>
            }
        </View>
        </VStack>
        <HStack alignItems='center' justifyContent='center' gap={"$5"} py={'$5'}>
        <Button onPress={submitForm}>
            <ButtonText>حفظ</ButtonText>
        </Button>
        </HStack>
        </FormControl>
        )}
        </Formik>
    )
}

export default ResetPasswordForm