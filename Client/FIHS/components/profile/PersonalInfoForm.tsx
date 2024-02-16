import React from 'react'
import {Formik} from 'formik'
import { Button, HStack, Text, View } from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import CustomInput from '@/components/profile/CustomInput';
import { Heading } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { PersonalInfo } from '@/models/PersonalInfo';
type Props = {}

const PersonalInfoForm = (props: Props) => {
    return (
        <Formik<PersonalInfo>
        initialValues={{
        firstName:'يوسف',
        lastName:'محمد',
        email:'yousef.helly@gmail.com',
        phoneNumber:'01020273407',
        username:'يوسف الحلي'
        }}
        onSubmit={(vals)=>{
        console.log(vals);
        }}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <FormControl 
        px={"$5"} 
        mt={"$5"} 
        mb={"$1"}   
        py={"$5"}    
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        >
        <Heading color="$textDark900" size='md' lineHeight="$md">
        المعلومات الشخصية
        </Heading>
        <HStack gap={"$5"} pt={"$2"} pb={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>البريد الإلكتروني : </Text>
            <CustomInput name='email' onChangeText={handleChange as any} onBlur={handleBlur} value={values.email} isDisabled={true}/>
        </View>
        </HStack>
        <HStack gap={"$5"} pt={"$2"} pb={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>الاسم الاول : </Text>
            <CustomInput name='firstName' onChangeText={handleChange as any} onBlur={handleBlur} value={values.firstName}/>
        </View>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>الاسم الاخير : </Text>
            <CustomInput name='lastName' onChangeText={handleChange as any} onBlur={handleBlur} value={values.lastName}/>
        </View>
        </HStack>
        <HStack gap={"$5"} py={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>اسم المستخدم : </Text>
            <CustomInput name='username' onChangeText={handleChange as any} onBlur={handleBlur} value={values.username}/>
        </View>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>رقم الهاتف : </Text>
            <CustomInput name='phoneNumber' onChangeText={handleChange as any} onBlur={handleBlur} value={values.phoneNumber}/>
        </View>
        </HStack>
        <HStack alignItems='center' justifyContent='center' gap={"$5"} py={'$5'}>
        <Button variant='outline'>
            <ButtonText>إعادة تعيين</ButtonText>
        </Button>
        <Button>
            <ButtonText>حفظ</ButtonText>
        </Button>
        </HStack>
        </FormControl>
        )}
        </Formik>
    )
}

export default PersonalInfoForm