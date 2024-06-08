import React from "react";
import { useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  ButtonText,
  Image,
  Input,
  InputField,
  TextareaInput,
  View,
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { Textarea } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";

type Props = {};

function FormInput<T>({
  name,
  field,
  type = "text",
}: {
  name: string;
  field: keyof T;
  type?: "text" | "textare" | "image" | "number";
}) {
  const { setFieldValue, handleBlur, values, errors } = useFormikContext<T>();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFieldValue(field as string, result.assets[0]);
    }
  };
  return (
    <View flex={1}>
      <Text fontWeight='bold' size='sm' py={"$1.5"}>
        {name} :{" "}
      </Text>
      {type === "image" ? (
        (values as any).image ? (
          <Image
            source={{
              uri:
                typeof (values as any).image == "string"
                  ? (values as any).image
                  : ((values as any).image as ImagePicker.ImagePickerAsset).uri,
            }}
            alt={(values as any).name || ""}
          />
        ) : (
          <Button size='lg' variant='outline' onPress={pickImage}>
            <ButtonText>
              <FontAwesome name='image' size={18} />
            </ButtonText>
          </Button>
        )
      ) : type === "textare" ? (
        <Textarea
          size='sm'
          id={"currentPassword"}
          isInvalid={false}
          isReadOnly={false}
        >
          <TextareaInput
            textAlign={"right"}
            direction='rtl'
            onChangeText={(e) => setFieldValue(field as string, e)}
            onBlur={handleBlur(field as string) as any}
            defaultValue={(values[field] as string) || ""}
          ></TextareaInput>
        </Textarea>
      ) : (
        <Input
          variant='outline'
          size='md'
          id={"currentPassword"}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            keyboardType={type === "number" ? "number-pad" : undefined}
            type={type === "text" ? "text" : undefined}
            textAlign={"right"}
            direction='rtl'
            onChangeText={(e) => setFieldValue(field as string, e) as any}
            onBlur={handleBlur(field) as any}
            defaultValue={(values[field] as string) || ""}
          />
        </Input>
      )}

      {
        //@ts-ignore
        errors[field] && (
          <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
            <Text size='xs' color='$red500'>
              <FontAwesome name='exclamation-circle' />
            </Text>
            <Text size='xs' color='$red500'>
              {errors[field] as string}
            </Text>
          </HStack>
        )
      }
    </View>
  );
}

export default FormInput;
