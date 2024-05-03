import React, { useEffect, useState } from "react";
import { IOScrollView, InView } from "react-native-intersection-observer";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { ButtonSpinner } from "@gluestack-ui/themed";

type Props = {
  children: React.ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const AutoFetching = ({
  children,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      fetchNextPage();
    }
  }, [show]);
  return (
    <IOScrollView>
      {children}
      {hasNextPage && (
        <InView onChange={(inView: boolean) => setShow(inView)}>
          {!isFetchingNextPage && (
            <Button
              w={show ? "$8" : "$32"}
              variant='solid'
              alignSelf='center'
              mt={"auto"}
              rounded={"$md"}
              onPress={() => fetchNextPage()}
            >
              <ButtonText>المزيد</ButtonText>
            </Button>
          )}
          {isFetchingNextPage && (
            <Button
              w={show ? "$8" : "$32"}
              variant='solid'
              alignSelf='center'
              mt={"auto"}
              rounded={"$md"}
              onPress={() => fetchNextPage()}
            >
              <ButtonSpinner />
            </Button>
          )}
        </InView>
      )}
    </IOScrollView>
  );
};

export default AutoFetching;
