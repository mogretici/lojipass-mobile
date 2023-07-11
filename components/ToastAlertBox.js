import React from "react";
import { VStack, HStack, Text, Alert } from "native-base";

const ToastAlertBox = ({ description, status }) => {
  return (
    <Alert
      w="100%"
      borderTopRadius={20}
      borderBottomRadius={0}
      alignSelf="center"
      flexDirection="row"
      top={50}
      status={status ? status : "error"}
      variant={"solid"}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        ></HStack>
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text textAlign={"center"} px="6" color={"lightText"}>
            {description}
          </Text>
        </HStack>
      </VStack>
    </Alert>
  );
};
export default ToastAlertBox;
