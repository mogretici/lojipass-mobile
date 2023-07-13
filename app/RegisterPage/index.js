import {
  Box,
  Radio,
  VStack,
  Input,
  Button,
  HStack,
  Center,
  Text,
  Pressable,
  useToast,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RegisterUser } from "../../API";
import ToastAlertBox from "../../components/ToastAlertBox";
import Header from "../../components/Header";
import Lottie from "lottie-react-native";
import { useUser } from "../../context/UserContext";

const RegisterPage = () => {
  const toast = useToast();
  const { createCacheUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthday(date.toLocaleDateString());
    hideDatePicker();
  };
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Çok kısa!")
      .max(50, "Çok uzun!")
      .required("Zorunlu alan!"),
    surname: Yup.string()
      .min(2, "Çok kısa!")
      .max(50, "Çok uzun!")
      .required("Zorunlu alan!"),
    id: Yup.string()
      .min(11, "Geçersiz TC Kimlik No!")
      .max(11, "Geçersiz TC Kimlik No!")
      .required("Zorunlu alan!"),
    birthday: Yup.string().required("Zorunlu alan!"),
    email: Yup.string().email("Geçersiz e-posta!").required("Zorunlu alan!"),
    password: Yup.string()
      .min(5, "Şifre en az 5 karakter olmalı!")
      .max(50, "Şifre en fazla 50 karakter olmalı!")
      .required("Zorunlu alan!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor!")
      .required("Zorunlu alan!"),
    gender: Yup.string().required("Zorunlu alan!"),
  });

  const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Header title="KAYIT OL" back={true} />
        <KeyboardAwareScrollView
          enableAutomaticScroll
          enableOnAndroid={true}
          contentContainerStyle={{ flexGrow: 1 }}
          extraScrollHeight={100}
          showsVerticalScrollIndicator={false}
        >
          <Center w="100%" h={"full"}>
            {/* {loading ? (
              <Lottie
                resizeMode="contain"
                source={require("../../assets/animation.json")}
                autoPlay
                loop
              />
            ) : ( */}
            <Box safeArea px="2" pb="8" w="80%" maxW="290">
              <Formik
                initialValues={{
                  name: "",
                  surname: "",
                  id: "",
                  birthday: "",
                  email: "",
                  password: "",
                  password2: "",
                  gender: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  toast.show({
                    render: () => {
                      return (
                        <ToastAlertBox
                          status={"success"}
                          description={
                            "KAYIT İŞLEMİ YAPILIYOR. LÜTFEN BEKLEYİNİZ.."
                          }
                        />
                      );
                    },
                  });
                  let data = {
                    name: values.name + " " + values.surname,
                    identificationNumber: values.id,
                    dateOfBirth: birthday,
                    email: values.email,
                    sex: values.gender,
                    password: values.password,
                  };
                  createCacheUser(data);
                  await RegisterUser(data)
                    .then((res) => {
                      res._id
                        ? (toast.show({
                            render: () => {
                              return (
                                <ToastAlertBox
                                  status={"success"}
                                  description={"KAYIT BAŞARILI!"}
                                />
                              );
                            },
                          }),
                          setTimeout(() => {
                            setLoading(false);
                            router.push({
                              pathname: "/LoginPage",
                              params: {
                                resEmail: values.email,
                                resPass: values.password,
                              },
                            });
                          }, 3000))
                        : (setLoading(false),
                          toast.show({
                            render: () => {
                              return (
                                <ToastAlertBox
                                  description={"KAYIT BAŞARISIZ !"}
                                />
                              );
                            },
                          }));
                    })
                    .catch((err) => {
                      setLoading(false);
                      toast.show({
                        render: () => {
                          return (
                            <ToastAlertBox
                              description={`KAYIT BAŞARISIZ: ${err.response.data}`}
                            />
                          );
                        },
                      });
                    });
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <VStack space={4} mt="5">
                    <Input
                      size={"2xl"}
                      variant={"filled"}
                      rounded={"lg"}
                      bgColor="transparent"
                      borderColor="text.400"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="person" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      placeholder="Ad"
                    />
                    {errors.name && touched.name ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.name}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      size={"2xl"}
                      variant={"filled"}
                      rounded={"lg"}
                      bgColor="transparent"
                      borderColor="text.400"
                      onChangeText={handleChange("surname")}
                      onBlur={handleBlur("surname")}
                      value={values.surname}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="person" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      placeholder="Soyad"
                    />
                    {errors.surname && touched.surname ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.surname}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      size={"2xl"}
                      variant={"filled"}
                      rounded={"lg"}
                      inputMode="numeric"
                      bgColor="transparent"
                      borderColor="text.400"
                      keyboardType="numeric"
                      maxLength={11}
                      onChangeText={handleChange("id")}
                      onBlur={handleBlur("id")}
                      value={values.id}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="fingerprint" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      placeholder="Kimlik Numarası"
                    />
                    {errors.id && touched.id ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.id}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      size={"2xl"}
                      variant={"filled"}
                      rounded={"lg"}
                      bgColor="transparent"
                      borderColor="text.400"
                      editable={false}
                      onPressIn={showDatePicker}
                      onChangeText={handleChange("birthday")}
                      value={values.birthday}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="cake" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      placeholder="Doğum Tarihi"
                      InputRightElement={
                        <Pressable onPress={showDatePicker}>
                          <Icon
                            as={<MaterialIcons name={"date-range"} />}
                            size={6}
                            mr="2"
                            color="#002B5B"
                          />
                        </Pressable>
                      }
                    />
                    {errors.birthday && touched.birthday && !birthday ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.birthday}</Text>
                      </HStack>
                    ) : null}
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      locale="tr_TR"
                      date={new Date(946684800000)}
                      onConfirm={(e) => {
                        handleConfirm(e);
                        values.birthday = e.toLocaleDateString();
                        handleChange("birthday");
                      }}
                      onCancel={() => {
                        handleBlur("birthday");
                        hideDatePicker();
                      }}
                    />
                    <HStack
                      alignItems={{
                        base: "center",
                        md: "center",
                      }}
                      space={3}
                      maxW="300px"
                    >
                      <MaterialCommunityIcons
                        name="gender-male-female"
                        size={24}
                        color={"#002B5B"}
                      />
                      <Text fontSize="lg" color={"muted.400"}>
                        Cinsiyet:
                      </Text>
                      <Radio.Group
                        name="gender"
                        onChange={handleChange("gender")}
                        onBlur={handleBlur("gender")}
                        value={values.gender}
                      >
                        <HStack
                          alignItems={{
                            base: "center",
                            md: "center",
                          }}
                          space={3}
                        >
                          <Radio
                            value="Kadın"
                            colorScheme="black"
                            size="md"
                            my={1}
                          >
                            <Text fontSize="lg" color={"#002B5B"}>
                              Kadın
                            </Text>
                          </Radio>
                          <Radio
                            value="Erkek"
                            colorScheme="black"
                            size="md"
                            my={1}
                          >
                            <Text fontSize="lg" color={"#002B5B"}>
                              Erkek
                            </Text>
                          </Radio>
                        </HStack>
                      </Radio.Group>
                    </HStack>
                    {errors.gender && touched.gender ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.gender}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      size={"2xl"}
                      variant={"filled"}
                      rounded={"lg"}
                      bgColor="transparent"
                      borderColor="text.400"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="email" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      placeholder="E-Posta"
                    />
                    {errors.email && touched.email ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.email}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      type={showPass ? "text" : "password"}
                      rounded={"lg"}
                      size={"2xl"}
                      textContentType="oneTimeCode"
                      bgColor="transparent"
                      borderColor="text.400"
                      variant={"filled"}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="lock" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      InputRightElement={
                        <Pressable onPress={() => setShowPass(!showPass)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={
                                  showPass ? "visibility" : "visibility-off"
                                }
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
                    {errors.password && touched.password ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.password}</Text>
                      </HStack>
                    ) : null}
                    <Input
                      type={showPass ? "text" : "password"}
                      rounded={"lg"}
                      size={"2xl"}
                      bgColor="transparent"
                      borderColor="text.400"
                      textContentType="oneTimeCode"
                      variant={"filled"}
                      onChangeText={handleChange("password2")}
                      onBlur={handleBlur("password2")}
                      value={values.password2}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="lock" />}
                          size={5}
                          ml="2"
                          color="#002B5B"
                        />
                      }
                      InputRightElement={
                        <Pressable onPress={() => setShowPass(!showPass)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={
                                  showPass ? "visibility" : "visibility-off"
                                }
                              />
                            }
                            size={5}
                            mr="2"
                            color="#002B5B"
                          />
                        </Pressable>
                      }
                      placeholder="Şifre Tekrar"
                    />
                    {errors.password2 && touched.password2 ? (
                      <HStack
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        mt={-3}
                        mr={2}
                        mb={-2}
                      >
                        <MaterialIcons name="error" color={"red"} />
                        <Text color={"red.500"}> {errors.password2}</Text>
                      </HStack>
                    ) : null}
                    <HStack justifyContent="flex-end" width="100%" px={2}>
                      <Button
                        mt="2"
                        backgroundColor={"#002B5B"}
                        onPress={handleSubmit}
                        w={"50%"}
                      >
                        KAYIT OL
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </Formik>
            </Box>
            {/* )} */}
          </Center>
        </KeyboardAwareScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default RegisterPage;
