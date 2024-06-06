import {
  Avatar,
  AvatarFallbackText,
  Text,
  AvatarImage,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useSession from "@/hooks/state/useSession";
import { useRouter } from "expo-router";
import { Logout } from "@/hooks/useLogin";

type Panel = { name: string; icon: React.ReactNode; action: () => void };

export default function ProfileScreen() {
  const { imgUrl, firstName, lastName } = useSession();
  const router = useRouter();
  const logout = Logout();
  const panels: Panel[] = [
    {
      name: "تعديل الصفحة الشخصية",
      icon: <FontAwesome name='pencil' size={18} />,
      action: () => router.push("/(tabs)/(profile)/update"),
    },
    {
      name: "إعدادات الحساب",
      icon: <FontAwesome name='gear' size={18} />,
      action: () => router.push("/(tabs)/(profile)/settings"),
    },
    {
      name: "لوحة التحكم",
      icon: <AntDesign name='tool' size={18} />,
      action: () => router.push("/(admin)/dashboard"),
    },
    {
      name: "تسجيل الخروج",
      icon: <AntDesign name='logout' size={18} />,
      action: () => logout.mutate(),
    },
  ];
  return (
    <VStack gap={"$5"} my={"$16"}>
      <VStack alignItems='center' gap={"$0.5"}>
        <Avatar size='xl' alignSelf='center'>
          <AvatarFallbackText>{firstName + " " + lastName}</AvatarFallbackText>
          <AvatarImage
            alt={firstName + " " + lastName}
            source={imgUrl || require("@/assets/images/avatar.png")}
          />
        </Avatar>
        <Text fontWeight='$bold' py={"$2"}>
          {firstName + " " + lastName}
        </Text>
        <Text alignSelf='flex-start' fontWeight='$bold' px={"$6"} py={"$5"}>
          الخيارات
        </Text>
        <VStack w={"$full"} gap={"$3"} px={"$6"}>
          {panels.map((panel) => (
            <Panel panel={panel} />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}

const Panel = ({ panel }: { panel: Panel }) => {
  return (
    <TouchableOpacity onPress={panel.action}>
      <HStack
        p={"$2"}
        alignItems='center'
        gap={"$3"}
        rounded={"$md"}
        bg='$backgroundDark200'
      >
        <Text mx={"$2"}>{panel.icon}</Text>
        <Text fontWeight='bold'>{panel.name}</Text>
      </HStack>
    </TouchableOpacity>
  );
};
