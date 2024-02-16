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
                    isDisabled={isDisabled??false}
                    isInvalid={false}
                    isReadOnly={false}
        >
            <InputField
            type={type?type:'text'}
            textAlign='right'
            direction='rtl' 
            onChangeText={onChangeText!(name)} 
            onBlur={onBlur(name)} 
            value={value}
            />
        </Input>
  )
}

export default CustomInput