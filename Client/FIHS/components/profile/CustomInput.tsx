import { Input, InputField } from '@gluestack-ui/themed'
import React from 'react'

type Props = {
    name: string,
    onChangeText: ((text: string) => undefined) | undefined,
    onBlur: any,
    value: string,
    type?: 'text'|'password',
    isDisabled?: boolean
}

const CustomInput = ({name, onChangeText, onBlur, value, type, isDisabled}: Props) => {
  return (
      <Input
          variant="outline"
          size="md"
          id={name}
          isDisabled={isDisabled??false}
          isInvalid={false}
          isReadOnly={false}
      >
          <InputField
          type={type?type:'text'}
          textAlign={(type==='password' || name ==='email' || name ==='phoneNumber')?'left':'right'}
          direction='rtl' 
          onChangeText={(e)=>onChangeText!(e)} 
          onBlur={onBlur(name)} 
          value={value}
          />
      </Input>
  )
}

export default CustomInput