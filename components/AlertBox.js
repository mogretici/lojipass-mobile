import { Alert, HStack, VStack, Text } from "native-base";
import React from "react";

const AlertBox = ({ message, status }) => {
  return (
    <Alert
      w="100%"
      borderTopRadius={20}
      borderBottomRadius={0}
      variant={"solid"}
      colorScheme={status}
      status={status}
    >
      <VStack space={2} flexShrink={1} w="100%" py={2} px={2}>
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text color="white">{message}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertBox;
