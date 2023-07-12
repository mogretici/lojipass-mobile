import { HStack, VStack, Text, Box } from "native-base";
import React from "react";

const TicketView = ({ voyage }) => {
  return (
    <>
      <HStack
        flex={5}
        borderColor={"#002B5B"}
        borderWidth={1}
        borderLeftRadius={10}
        p={6}
        backgroundColor={"#002B5B"}
        justifyContent={"space-between"}
      >
        <VStack justifyContent={"space-between"}>
          <VStack>
            <Text fontSize={14} fontFamily={"Play"} color={"#ededed"}>
              SAAT:
            </Text>
            <Text fontSize={20} fontFamily={"Play"} color={"#ededed"}>
              {voyage.time}
            </Text>
          </VStack>
          <VStack alignItems={"center"}>
            <Text fontSize={14} fontFamily={"Play"} color={"#ededed"}>
              FİYAT:
            </Text>
            <Text fontSize={20} fontFamily={"Play"} color={"#ededed"}>
              {voyage.price} ₺
            </Text>
          </VStack>
        </VStack>
        <VStack justifyContent={"center"}>
          <Box
            display={"absolute"}
            rounded={"full"}
            right={90}
            width={10}
            height={10}
            backgroundColor={"#d4d4d4"}
          ></Box>
        </VStack>
        <VStack>
          <Box
            display={"absolute"}
            rounded={"full"}
            top={-50}
            right={7}
            width={12}
            height={10}
            backgroundColor={"#d4d4d4"}
          />
          <VStack my={-10} mx={-3} space={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box
                key={item}
                display={"absolute"}
                rounded={"full"}
                width={3}
                height={3}
                backgroundColor={"#d4d4d4"}
              />
            ))}
          </VStack>
          <Box
            display={"absolute"}
            rounded={"full"}
            bottom={-50}
            right={7}
            width={12}
            height={10}
            backgroundColor={"#d4d4d4"}
          ></Box>
        </VStack>
      </HStack>
    </>
  );
};

export default TicketView;
