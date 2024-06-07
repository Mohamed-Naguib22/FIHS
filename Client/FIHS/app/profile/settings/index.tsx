import { View, Text } from "react-native";
import React from "react";
import DeleteAccount from "@/components/profile/DeleteAccount";
import ScreenHeader from "@/components/layout/ScreenHeader";

type Props = {};

const SettingsScreen = (props: Props) => {
  return (
    <ScreenHeader name='إعدادات الحساب'>
      <DeleteAccount />
    </ScreenHeader>
  );
};

export default SettingsScreen;
