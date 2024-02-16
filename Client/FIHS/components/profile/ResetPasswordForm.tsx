import React from 'react'
import {Formik} from 'formik'
import { Button, HStack, Text, VStack, View } from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import CustomInput from '@/components/profile/CustomInput';
import { Heading } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { ResetPassword } from '@/models/ResetPassword';
type Props = {}

const ResetPasswordForm = (props: Props) => {
    return (
        <Formik<ResetPassword>
        initialValues={{
            oldPassword:'',
            newPassword:''
        }}
        onSubmit={(vals)=>{
        console.log(vals);
        }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
            <CustomInput name='oldPassword' onChangeText={handleChange as any} onBlur={handleBlur} value={values.oldPassword} type='password'/>
        </View>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>كلمة المرور الجديدة : </Text>
            <CustomInput name='newPassword' onChangeText={handleChange as any} onBlur={handleBlur} value={values.newPassword} type='password'/>
        </View>
        </VStack>
        <HStack alignItems='center' justifyContent='center' gap={"$5"} py={'$5'}>
        <Button>
            <ButtonText>حفظ</ButtonText>
        </Button>
        </HStack>
        </FormControl>
        )}
        </Formik>
    )
}

export default ResetPasswordForm