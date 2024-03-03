import React from 'react'
import {Formik} from 'formik'
import { Button, HStack, Text, View } from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import CustomInput from '@/components/profile/CustomInput';
import { Heading } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { PersonalInfo, PersonalInfoSchema } from '@/models/PersonalInfo';
import useSession from '@/hooks/state/useSession';
import { FontAwesome } from '@expo/vector-icons';
import { UpdateProfile } from '@/hooks/useProfile';
type Props = {}

const PersonalInfoForm = (props: Props) => {
    const {email, firstName, lastName, phoneNumber} = useSession()
    const updateProfile = UpdateProfile()
    return (
        <Formik<PersonalInfo>
        initialValues={{
        firstName:firstName,
        lastName:lastName,
        email:email,
        phoneNumber:phoneNumber,
        }}
        onSubmit={(vals)=>{
        console.log(vals);
        updateProfile.mutate(vals)
        }}
        validationSchema={PersonalInfoSchema}
        >
        {({ setFieldValue, handleBlur, submitForm, resetForm, values, initialValues, errors }) => (
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
            <CustomInput name='email' onChangeText={setFieldValue.bind(null, 'email') as any} onBlur={handleBlur} value={values.email} isDisabled={true}/>
        </View>
        </HStack>
        <HStack gap={"$5"} pt={"$2"} pb={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>الاسم الاول : </Text>
            <CustomInput name='firstName' onChangeText={setFieldValue.bind(null, 'firstName') as any} onBlur={handleBlur} value={values.firstName}/>
            {
                  errors.firstName&& 
                  <HStack gap={'$1'} my={'$1.5'} mx={'$3'}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle'/>
                    </Text>
                    <Text size='xs' color='$red500'>{errors.firstName}</Text>
                  </HStack>
            }
        </View>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>الاسم الاخير : </Text>
            <CustomInput name='lastName' onChangeText={setFieldValue.bind(null, 'lastName') as any} onBlur={handleBlur} value={values.lastName}/>
            {
                  errors.lastName&& 
                  <HStack gap={'$1'} my={'$1.5'} mx={'$3'}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle'/>
                    </Text>
                    <Text size='xs' color='$red500'>{errors.lastName}</Text>
                  </HStack>
            }
        </View>
        </HStack>
        <HStack gap={"$5"} py={'$1.5'}>
        <View flex={1}>
            <Text fontWeight='bold' size='sm' py={"$1.5"}>رقم الهاتف : </Text>
            <CustomInput name='phoneNumber' onChangeText={setFieldValue.bind(null, 'phoneNumber') as any} onBlur={handleBlur} value={values.phoneNumber}/>
            {
                errors.phoneNumber&& 
                <HStack gap={'$1'} my={'$1.5'} mx={'$3'}>
                <Text size='xs' color='$red500'>
                    <FontAwesome name='exclamation-circle'/>
                </Text>
                <Text size='xs' color='$red500'>{errors.phoneNumber}</Text>
                </HStack>
            }
        </View>
        </HStack>
        <HStack alignItems='center' justifyContent='center' gap={"$5"} py={'$5'}>
        <Button onPress={()=>resetForm()} variant='outline'>
            <ButtonText>إعادة تعيين</ButtonText>
        </Button>
        <Button
        disabled={
            values.firstName === initialValues.firstName 
            && values.lastName === initialValues.lastName &&
            values.phoneNumber === initialValues.phoneNumber
        } 
        onPress={submitForm}
        >
            <ButtonText>حفظ</ButtonText>
        </Button>
        </HStack>
        </FormControl>
        )}
        </Formik>
    )
}

export default PersonalInfoForm