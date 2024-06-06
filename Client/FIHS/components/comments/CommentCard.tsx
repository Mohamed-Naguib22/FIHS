import React from "react";
import {
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarImage,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { DeleteComment } from "@/hooks/useComment";
import { FontAwesome } from "@expo/vector-icons";
import useSession from "@/hooks/state/useSession";

type Props = {
  comment: TComment;
  refetchComments: () => void;
  setToBeUpdated: (comment: TComment) => void;
};

const CommentCard = ({ comment, refetchComments, setToBeUpdated }: Props) => {
  const deleteComment = DeleteComment();
  const { email } = useSession();
  return (
    <HStack
      gap={"$3"}
      alignItems='center'
      bg='$backgroundDark0'
      p={"$2"}
      pb={"$0"}
      rounded={"$md"}
      softShadow='1'
    >
      <Avatar style={{ borderRadius: 20, width: 40, height: 40 }}>
        <AvatarImage source={comment.user.imgUrl} alt={comment.user.username} />
      </Avatar>
      <VStack
        gap={"$2"}
        flexBasis={"$5/6"}
        alignItems='flex-start'
        justifyContent='center'
      >
        <Text fontWeight='$bold'>{comment.user.username}</Text>
        <Text>{comment.commentBody}</Text>

        {email === comment.user.email && (
          <HStack alignSelf='flex-end'>
            {
              //TODO
              /* <Button
              action='primary'
              bg='transparent'
              variant='link'
              onPress={() => setToBeUpdated(comment)}
            >
              <ButtonText bg='transparent'>
                <FontAwesome name='edit' size={24} />
              </ButtonText>
            </Button> */
            }
            <Button
              onPress={() =>
                deleteComment.mutate(
                  { id: comment.id },
                  {
                    onSuccess(data, variables, context) {
                      refetchComments();
                    },
                  }
                )
              }
              action='negative'
              bg='transparent'
              variant='link'
            >
              <ButtonText bg='transparent'>
                <FontAwesome name='trash' size={24} />
              </ButtonText>
            </Button>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};

export default CommentCard;
