import { Text, HStack, VStack, Input, Button, Box } from "native-base";
import { useUser } from "../../context/UserContext.js";
import React, { useState } from "react";
import Header from "../../components/Header.js";
import CreditCardUI from "rn-credit-card-ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PaymentPage = () => {
  const { ticket } = useUser();

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
    setCreditInfo((prevCreditInfo) => ({
      ...prevCreditInfo,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    console.log(creditInfo);
    console.log(ticket);
    let currentYear = new Date().getFullYear();
  };

  return (
    <>
      <Header title={"ÖDEME EKRANI"} back={true} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={150}
        showsVerticalScrollIndicator={false}
      >
        <CreditCardUI
          cardNumber={creditInfo.cardNumber.slice(0, 19)}
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
          variant={"subtle"}
          backgroundColor={"text.200"}
          borderWidth={1}
          mx={"auto"}
          w={"90%"}
          p={3}
          borderRadius={10}
        >
          <VStack alignItems={"flex-start"} w={"full"}>
            <Text p={2}>Kart No:</Text>
            <Input
              name="cardNumber"
              keyboardType="number-pad"
              textContentType="creditCardNumber"
              variant="rounded"
              value={ccNumberFormat(cardNumber)}
              onChangeText={(value) => handleChange("cardNumber", value)}
              borderColor={"#002B5B"}
              maxLength={19}
              placeholder="**** **** **** ****"
            />
          </VStack>
          <VStack alignItems={"flex-start"} w={"full"}>
            <Text p={2}>Kart Üzerindeki İsim:</Text>
            <Input
              name="holderName"
              value={holderName}
              onChangeText={(value) => handleChange("holderName", value)}
              variant="rounded"
              borderColor={"#002B5B"}
              placeholder="Ad Soyad"
            />
          </VStack>
          <HStack alignItems={"flex-start"} space={2}>
            <VStack flex={1}>
              <Text p={2}>Son Kullanma Tarihi</Text>
              <Input
                name="expiryDate"
                value={expiryDate}
                keyboardType="numeric"
                onChangeText={(value) => {
                  let formattedValue = value;
                  if (value.length > 2 && !value.includes("/")) {
                    formattedValue =
                      value.substring(0, 2) + "/" + value.substring(2);
                  }
                  handleChange("expiryDate", formattedValue);
                }}
                variant="rounded"
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
                variant="rounded"
                borderColor={"#002B5B"}
                placeholder="***"
              />
            </VStack>
          </HStack>
        </Box>
        <Button
          alignSelf={"center"}
          backgroundColor={"#002B5B"}
          w={"60%"}
          mt={7}
          onPress={handlePayment}
        >
          ÖDEME YAP
        </Button>
      </KeyboardAwareScrollView>
    </>
  );
};

export default PaymentPage;
