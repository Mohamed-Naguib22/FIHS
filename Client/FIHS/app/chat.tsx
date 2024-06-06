import useSession from "@/hooks/state/useSession";
import useGemini from "@/hooks/useChat";
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
  Avatar,
  AvatarImage,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import Toast from "react-native-toast-message";

type Props = {};

const ChatScreen = (props: Props) => {
  const { imgUrl, token, firstName } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const ask = useGemini();

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    setMessage("");
    setMessages((prevMsgs) => GiftedChat.append(prevMsgs, messages));
    setIsTyping(true);

    ask.mutate(
      { question: messages[0].text! },
      {
        onSuccess(data, variables, context) {
          setIsTyping(false);
          const ansM: IMessage = {
            _id: `AI/${data.answer}`,
            createdAt: new Date(),
            text: data.answer,
            user: {
              _id: 0,
              name: "مساعد الفلاح الذكي",
              avatar: () => (
                <Avatar>
                  <AvatarImage
                    source={require("../assets/images/FIHS_ROBOT.jpg")}
                    alt={`AI`}
                  />
                </Avatar>
              ),
            },
            received: true,
          };
          setMessages((prevMsgs) => GiftedChat.append(prevMsgs, [ansM]));
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
          avatar: () => (
            <Avatar>
              <AvatarImage
                source={{
                  uri: imgUrl || require("../assets/images/avatar.png"),
                }}
                alt={`${firstName}`}
              />
            </Avatar>
          ),
          name: firstName,
        }}
        onSend={(messages) => onSend(messages)}
        isTyping={isTyping}
        messageIdGenerator={(message) =>
          `${message?.user.name}/${message?.text}`
        }
        renderBubble={(e) => (
          <View
            bg={e.currentMessage?.received ? "$light200" : "$primary400"}
            borderColor={
              e.currentMessage?.received ? "$textDark700" : "$primary400"
            }
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
                color={e.currentMessage?.received ? "$textDark700" : "$white"}
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
                  onSend([
                    {
                      _id: `${firstName}/${message}`,
                      createdAt: new Date(),
                      text: message,
                      user: {
                        _id: token,
                        name: firstName,
                        avatar: () => (
                          <Avatar>
                            <AvatarImage
                              source={{
                                uri:
                                  imgUrl ||
                                  require("../assets/images/avatar.png"),
                              }}
                              alt={`${firstName}`}
                            />
                          </Avatar>
                        ),
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
        inverted={true}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
