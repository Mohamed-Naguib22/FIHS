import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText, FormControl, Heading } from "@gluestack-ui/themed";
import { useDeleteAccount } from "@/hooks/useProfile";

type Props = {};

const DeleteAccount = (props: Props) => {
  const deleteAccount = useDeleteAccount();
  return (
    <FormControl px={"$5"} py={"$5"}>
      <Heading color='$textDark900' size='md' lineHeight='$md'>
        حذف الحساب
      </Heading>
      <Button
        onPress={() => deleteAccount.mutate()}
        bg='$red600'
        my={"$5"}
        mx={"$16"}
      >
        <ButtonText>حذف</ButtonText>
      </Button>
    </FormControl>
  );
};

export default DeleteAccount;
