import {
  Box,
  Heading,
  VStack,
  Pressable,
  Input,
  Button,
  HStack,
  Center,
  KeyboardAvoidingView,
  Icon,
  Text,
  useToast,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LoginUser } from "../../API.js";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext.js";
import ToastAlertBox from "../../components/ToastAlertBox";
import Lottie from "lottie-react-native";

const LoginPage = () => {
  const params = useLocalSearchParams();
  const { resEmail, resPass } = params;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(resEmail ? resEmail : "");
  const [password, setPassword] = useState(resPass ? resPass : "");
  const toast = useToast();
  const router = useRouter();
  const { setUserInformation, cacheUser } = useUser();

  const handleLogin = async () => {
    toast.show({
      render: () => {
        return (
          <ToastAlertBox
            description={"GİRİŞ YAPILIYOR LÜTFEN BEKLEYİN.."}
            status={"success"}
          />
        );
      },
    });
    setLoading(true);
    const input = {
      email: email,
      password: password,
    };
    await LoginUser(input)
      .then((res) => {
        toast.closeAll(), setLoading(false);
        res.token
          ? (setUserInformation(res), router.replace("/TicketInquiryPage"))
          : cacheUser &&
            input.email === cacheUser.email &&
            input.password === cacheUser.password // sunucu sorunlarına karşı cache'den giriş yapma
          ? (setUserInformation(cacheUser),
            router.replace("/TicketInquiryPage"))
          : toast.show({
              render: () => {
                return <ToastAlertBox description={"GİRİŞ BAŞARISIZ..."} />;
              },
            });
      })
      .catch((err) => {
        setLoading(false);
        toast.closeAll();
        cacheUser &&
        input.email === cacheUser.email &&
        input.password === cacheUser.password // sunucu sorunlarına karşı cache'den giriş yapma
          ? (setUserInformation(cacheUser),
            router.replace("/TicketInquiryPage"))
          : toast.show({
              render: () => {
                return (
                  <ToastAlertBox
                    description={`GİRİŞ BAŞARISIZ: ${err.response.data}`}
                  />
                );
              },
            });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <Center w="100%" h={"full"}>
          <Box
            flex={3}
            backgroundColor={"#002B5B"}
            w="100%"
            h={"full"}
            roundedBottomLeft={"50"}
            roundedBottomRight={"50"}
          >
            <Center
              space={2}
              alignItems="center"
              justifyContent="flex-end"
              w="100%"
              h={"full"}
              pb={"10"}
            >
              <Heading
                size="3xl"
                fontWeight="600"
                color="coolGray.50"
                _dark={{
                  color: "warmGray.50",
                }}
                letterSpacing="2xl"
                fontFamily={"Play"}
              >
                LOJIPASS
              </Heading>
              <Heading
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.400"
                fontWeight="medium"
                size="xs"
                fontFamily={"Play"}
                ml={"2"}
              >
                Bilet almanın en kolay yolu..
              </Heading>
            </Center>
          </Box>
          <Box safeArea p="5" py="8" w="90%" h={"full"} flex={5}>
            <VStack space={6}>
              <VStack space={1}>
                <Text pl={2} pb={2}>
                  E- Mail :
                </Text>
                <Input
                  size={"2xl"}
                  variant={"filled"}
                  rounded={"lg"}
                  borderColor="text.400"
                  value={email}
                  bgColor="transparent"
                  onChangeText={(text) => setEmail(text)}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="#002B5B"
                    />
                  }
                  placeholder="E-mail"
                />
              </VStack>
              <VStack space={1}>
                <Text pl={2} pb={2}>
                  Şifre :
                </Text>
                <Input
                  type={show ? "text" : "password"}
                  size={"2xl"}
                  bgColor="transparent"
                  rounded={"lg"}
                  borderColor="text.400"
                  variant={"filled"}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="#002B5B"
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="#002B5B"
                      />
                    </Pressable>
                  }
                  placeholder="Şifre"
                />
              </VStack>
            </VStack>
            <HStack justifyContent={"space-between"} mt={10} space={2}>
              <Button
                flex={1}
                mt="2"
                backgroundColor={"#002B5B"}
                rounded={"md"}
                onPress={() => {
                  router.push("/RegisterPage");
                }}
              >
                KAYIT OL
              </Button>
              <Button
                mt="2"
                flex={1}
                backgroundColor={"#002B5B"}
                onPress={
                  !loading && email.length > 0 && password.length > 0
                    ? handleLogin
                    : null
                }
                rounded={"md"}
              >
                {loading ? "YÜKLENİYOR..." : "GİRİŞ YAP"}
              </Button>
            </HStack>
          </Box>
          {/* {loading && (
            <Box h={"50%"} w={"100%"} position={"absolute"} bottom={-70}>
              <Lottie
                resizeMode="contain"
                source={require("../../assets/animation.json")}
                autoPlay
                loop
              />
            </Box>
          )} */}
        </Center>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
