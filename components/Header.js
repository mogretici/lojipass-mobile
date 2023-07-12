import { Box, HStack, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useRouter, useNavigation } from "expo-router";
const Header = ({ title, logout, back, home }) => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <Box
      backgroundColor={"#002B5B"}
      w="100%"
      roundedBottomLeft={"30"}
      roundedBottomRight={"30"}
      shadow={"9"}
      pt={3}
    >
      <HStack
        justifyContent="space-between"
        width="100%"
        px={8}
        pt={5}
        pb={2}
        alignItems={"center"}
      >
        {back && (
          <Text
            fontSize={40}
            flex={1}
            color="#ededed"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons
              alignSelf={"center"}
              name="arrow-back"
              size={30}
              color="#ededed"
            />
          </Text>
        )}
        {home && (
          <Text
            fontSize={40}
            flex={1}
            color="#ededed"
            onPress={() => {
              router.replace("/TicketInquiryPage");
            }}
          >
            <MaterialIcons
              alignSelf={"center"}
              name="home"
              size={30}
              color="#ededed"
            />
          </Text>
        )}
        <Text flex={5} fontSize={24} fontWeight={600} color="#ededed">
          {title}
        </Text>
        {logout && (
          <Text
            fontSize={40}
            flex={1}
            color="#ededed"
            onPress={() => {
              router.replace("/LoginPage");
            }}
          >
            <MaterialIcons
              alignSelf={"center"}
              name="logout"
              size={30}
              color="#ededed"
            />
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
