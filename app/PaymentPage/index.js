import {
  Text,
  HStack,
  VStack,
  Input,
  Button,
  Box,
  Badge,
  useToast,
} from "native-base";
import { Fontisto } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { useUser } from "../../context/UserContext.js";
import React, { useState } from "react";
import ToastAlertBox from "../../components/ToastAlertBox";
import Header from "../../components/Header.js";
import CreditCardUI from "rn-credit-card-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

const PaymentPage = () => {
  const { ticket } = useUser();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  let currentYear = new Date().getFullYear();
  const [creditInfo, setCreditInfo] = useState({
    cardNumber: "",
    cvc: "",
    holderName: "",
    expiryDate: "",
  });

  const { cardNumber, cvc, holderName, expiryDate } = creditInfo;
  const ccNumberFormat = (value) => {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  };

  const handleChange = (name, value) => {
    if (name === "cardNumber") {
      value.length > 18 && (value = value.slice(0, 19));
    }

    setCreditInfo((prevCreditInfo) => ({
      ...prevCreditInfo,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    !cardNumber || !cvc || !holderName || !expiryDate
      ? toast.show({
          render: () => {
            return (
              <ToastAlertBox description={"LÜTFEN TÜM ALANLARI DOLDURUNUZ !"} />
            );
          },
        })
      : (setLoading(true),
        toast.show({
          render: () => {
            return (
              <ToastAlertBox
                description={"BİLET OLUŞTURULUYOR LÜTFEN BEKLEYİN !"}
                status={"success"}
              />
            );
          },
        }),
        setTimeout(() => {
          setLoading(false);
          router.push("/TicketPage");
        }, 2000));
  };

  // return loading ? (
  //   <Lottie
  //     resizeMode="contain"
  //     source={require("../../assets/ticket.json")}
  //     autoPlay
  //     loop
  //   />
  // ) :
  return (
    <>
      <Header title={"ÖDEME YAP"} back={true} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={150}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={2}>
          <Box
            mx={"auto"}
            w={"90%"}
            mt={5}
            mb={-5}
            backgroundColor={"text.200"}
            borderColor={"text.200"}
            borderWidth={1}
            borderRadius={16}
            justifyContent={"space-between"}
          >
            <VStack
              space={2}
              style={{
                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
              }}
            >
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={16} bold>
                  BİLET DETAYLARI
                </Text>
                <Fontisto name="bus-ticket" size={40} color="black" />
              </HStack>
              <VStack space={1}>
                <HStack>
                  <Text bold>Firma: </Text>
                  <Text>{ticket.ticketDetail.company} TURİZM</Text>
                </HStack>
                <HStack>
                  <Text bold>Güzergah: </Text>
                  <Text>
                    {ticket.ticketRoute.from} - {ticket.ticketRoute.to}
                  </Text>
                </HStack>
                <HStack>
                  <Text bold>Sefer Tarihi: </Text>
                  <Text>
                    {ticket.ticketRoute.date} ({ticket.ticketDetail.time})
                  </Text>
                </HStack>
                <HStack>
                  <Text bold>Müşteri: </Text>
                  <Text>
                    {ticket.ticketRoute.user.name} (
                    {currentYear -
                      ticket.ticketRoute.user.dateOfBirth.split(".")[2]}{" "}
                    - {ticket.ticketRoute.user.sex})
                  </Text>
                </HStack>
                <HStack>
                  <Text bold>Müşteri Mail :</Text>
                  <Text>{ticket.ticketRoute.user.email}</Text>
                </HStack>
                <HStack space={1}>
                  <Text bold>Seçilen Koltuklar:</Text>
                  <HStack space={2}>
                    {ticket.seats.map((item) => (
                      <Badge rounded={"lg"} key={item} colorScheme={"success"}>
                        {item}
                      </Badge>
                    ))}
                  </HStack>
                </HStack>
                <HStack space={2}>
                  <Text bold>Toplam Tutar:</Text>
                  <Text>{ticket.price} ₺</Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>
          <CreditCardUI
            cardNumber={creditInfo.cardNumber}
            cardFrontContainerStyle={{
              width: 300,
              height: 200,
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
            cardBackContainerStyle={{
              width: 300,
              height: 200,
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
            cvc={creditInfo.cvc}
            cvcLabelStyle={{ color: "red" }}
            holderName={creditInfo.holderName}
            holderNameStyle={{
              marginBottom: 8,
            }}
            cardNumberStyle={{
              marginBottom: 10,
            }}
            expiryDate={creditInfo.expiryDate}
            bankName={"LOJIPASS"}
            isCardNumberShown={false}
            isHorizontalFlipEnabled={false}
            isVerticalFlipEnabled={true}
            dateLabel="VALID "
          />
          <Box
            mx={"auto"}
            w={"90%"}
            mt={-10}
            backgroundColor={"text.200"}
            borderColor={"text.200"}
            borderWidth={1}
            borderRadius={16}
            justifyContent={"space-between"}
          >
            <VStack m={4} space={2}>
              <HStack
                space={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text fontSize={16} bold>
                  ÖDEME BİLGİLERİ
                </Text>
                <Fontisto
                  alignSelf={"flex-end"}
                  name="credit-card"
                  size={20}
                  color="black"
                />
              </HStack>
              <VStack space={1} pr={4}>
                <VStack alignItems={"flex-start"} w={"full"}>
                  <Text p={2}>KART ÜZERİNDEKİ İSİM:</Text>
                  <Input
                    name="holderName"
                    value={holderName}
                    onChangeText={(value) => handleChange("holderName", value)}
                    borderColor={"#002B5B"}
                    placeholder="Ad Soyad"
                  />
                </VStack>
                <HStack space={2}>
                  <VStack flex={6}>
                    <VStack>
                      <Text p={2}>KART NO:</Text>
                      <Input
                        name="cardNumber"
                        keyboardType="number-pad"
                        textContentType="creditCardNumber"
                        focusOutlineColor={"black"}
                        value={ccNumberFormat(cardNumber)}
                        onChangeText={(value) =>
                          handleChange("cardNumber", value)
                        }
                        borderColor={"#002B5B"}
                        maxLength={19}
                        placeholder="**** **** **** ****"
                      />
                    </VStack>
                  </VStack>
                  <VStack flex={5}>
                    <HStack alignItems={"flex-start"} space={2}>
                      <VStack flex={1}>
                        <Text p={2}>VALID</Text>
                        <Input
                          name="expiryDate"
                          value={expiryDate}
                          keyboardType="numeric"
                          onChangeText={(value) => {
                            let formattedValue = value;
                            if (value.length > 2 && !value.includes("/")) {
                              formattedValue =
                                value.substring(0, 2) +
                                "/" +
                                value.substring(2);
                            }
                            handleChange("expiryDate", formattedValue);
                          }}
                          maxLength={5}
                          borderColor={"#002B5B"}
                          placeholder="AA/YY"
                        />
                      </VStack>
                      <VStack flex={1}>
                        <Text p={2}>CVC2</Text>
                        <Input
                          name="cvc"
                          value={cvc}
                          keyboardType="numeric"
                          onChangeText={(value) => handleChange("cvc", value)}
                          maxLength={3}
                          borderColor={"#002B5B"}
                          placeholder="***"
                        />
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </Box>
          <Button
            alignSelf={"center"}
            backgroundColor={"#002B5B"}
            w={"60%"}
            my={10}
            onPress={handlePayment}
          >
            ÖDEME YAP
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
};

export default PaymentPage;
