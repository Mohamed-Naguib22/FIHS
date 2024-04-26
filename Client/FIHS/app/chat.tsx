import Loading from "@/components/layout/Loading";
import useSession from "@/hooks/state/useSession";
import useGPT from "@/hooks/useGPT";
import storage from "@/utils/storage";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  Button,
  ButtonText,
  VStack,
  HStack,
  SafeAreaView,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import Toast from "react-native-toast-message";

type Props = {};

const ChatScreen = (props: Props) => {
  const {
    imgUrl,
    token,
    firstName,
    chatMessages,
    setChatMessages,
    isLoading,
    setLoading,
  } = useSession();
  useEffect(() => {
    storage
      .load<IMessage[]>({ key: "chat" })
      .then((data) => {
        setChatMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [messages, setMessages] = useState<IMessage[]>(chatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [msgID, setMsgID] = useState(1);
  const ask = useGPT();
  const onSend = useCallback(async (messages: IMessage[] = []) => {
    setMessage("");
    setMessages((prevMsgs) => GiftedChat.append(prevMsgs, messages));
    setChatMessages([...chatMessages, ...messages]);
    setIsTyping(true);

    ask.mutate(
      { question: messages[0].text! },
      {
        onSuccess(data, variables, context) {
          setIsTyping(false);
          setMsgID((prev) => prev + 1);
          setMessages((prevMsgs) =>
            GiftedChat.append(prevMsgs, [
              {
                _id: msgID,
                createdAt: new Date(),
                text: data.answer,
                user: {
                  _id: 0,
                  name: "مساعد الفلاح الذكي",
                  avatar: require("../assets/images/FIHS_ROBOT.jpg"),
                },
                received: true,
              },
            ])
          );
          setChatMessages([
            ...chatMessages,
            {
              _id: msgID,
              createdAt: new Date(),
              text: data.answer,
              user: {
                _id: 0,
                name: "مساعد الفلاح الذكي",
                avatar: require("../assets/images/FIHS_ROBOT.jpg"),
              },
              received: true,
            },
          ]);
        },
        onError(error, variables, context) {
          setIsTyping(false);
          Toast.show({
            type: "error",
            text1: "حدث خطأ ما",
            text2: error.message,
          });
        },
      }
    );
  }, []);
  return (
    <SafeAreaView flex={1}>
      <GiftedChat
        messages={messages}
        user={{
          _id: token,
          avatar: imgUrl || require("../assets/images/avatar.png"),
          name: firstName,
        }}
        onSend={(messages) => onSend(messages)}
        isTyping={isTyping}
        renderBubble={(e) => (
          <View
            bg={e.currentMessage?.received ? "$light100" : "$primary400"}
            borderColor='$primary400'
            borderWidth={"$1"}
            p={"$2.5"}
            my={"$1"}
            maxWidth={"75%"}
            style={{
              borderTopRightRadius: 2,
              borderBottomRightRadius: e.currentMessage?.received ? 2 : 10,
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: e.currentMessage?.received ? 10 : 2,
            }}
          >
            <VStack gap={"$0.5"}>
              <Text
                color={e.currentMessage?.received ? "$primary400" : "$white"}
                size='md'
              >
                {e.currentMessage?.text}
              </Text>
            </VStack>
          </View>
        )}
        renderInputToolbar={(e) => (
          <View borderTopColor='$primary400' borderTopWidth={"$1"}>
            <HStack flexDirection='row-reverse'>
              <View w={"85%"} h={"$12"} p={"$1.5"} bg='$light100'>
                <TextInput
                  style={{
                    width: "100%",
                    textAlign: "right",
                    padding: 8,
                    paddingBottom: 10,
                  }}
                  placeholder='ادخل رسالة'
                  value={message}
                  onChangeText={(e) => setMessage(e)}
                />
              </View>
              <Button
                onPress={() => {
                  setMsgID((prev) => prev + 1);
                  onSend([
                    {
                      _id: msgID,
                      createdAt: new Date(),
                      text: message,
                      user: {
                        _id: token,
                        name: firstName,
                        avatar:
                          imgUrl || require("../assets/images/avatar.png"),
                      },
                    },
                  ]);
                }}
                disabled={message.length <= 2}
                w={"15%"}
                h={"$12"}
                rounded={"$none"}
              >
                <ButtonText>
                  <FontAwesome name='send' />
                </ButtonText>
              </Button>
            </HStack>
          </View>
        )}
        renderAvatarOnTop={true}
        inverted={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
