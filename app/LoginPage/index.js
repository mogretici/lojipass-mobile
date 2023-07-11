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
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LoginUser } from "../../API.js";
import React, { useState } from "react";
import AlertBox from "../../components/AlertBox.js";
import { useUser } from "../../context/UserContext.js";

const LoginPage = () => {
  const params = useLocalSearchParams();
  const { resEmail } = params;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(resEmail ? resEmail : "a@a.com");
  const [password, setPassword] = useState(resEmail ? "" : "111111");
  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const router = useRouter();
  const { setUserInformation } = useUser();

  const handleLogin = async () => {
    setAlert({
      isOpen: true,
      message: "Giriş yapılıyor lütfen bekleyiniz..",
      status: "success",
    });
    setLoading(true);
    const input = {
      email: email,
      password: password,
    };
    await LoginUser(input)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setAlert({
          isOpen: false,
          message: "",
          status: "",
        });
        res.token
          ? (setUserInformation(res), router.replace("/TicketInquiryPage"))
          : setAlert({
              isOpen: true,
              message: "Giriş başarısız",
              status: "error",
            });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          isOpen: true,
          message: `Giriş Başarısız: ${err.response.data}`,
          status: "error",
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
                  rounded={"xl"}
                  value={email}
                  bgColor="transparent"
                  borderColor="#002B5B"
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
                  rounded={"xl"}
                  size={"2xl"}
                  bgColor="transparent"
                  borderColor="#002B5B"
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
                  console.log("Kaydol butonuna basıldı.");
                  router.push("/RegisterPage");
                }}
              >
                KAYIT OL
              </Button>
              <Button
                mt="2"
                flex={1}
                backgroundColor={"#002B5B"}
                onPress={!loading ? handleLogin : null}
                rounded={"md"}
              >
                {loading ? "YÜKLENİYOR..." : "GİRİŞ YAP"}
              </Button>
            </HStack>
          </Box>
          {alert.isOpen && (
            <AlertBox message={alert.message} status={alert.status} />
          )}
        </Center>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
