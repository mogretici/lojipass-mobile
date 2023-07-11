import { Text, HStack, VStack, Heading, Box, Badge, Button } from "native-base";
import { useUser } from "../../context/UserContext.js";
import React, { useState } from "react";
import Header from "../../components/Header.js";
import ZigzagView from "react-native-zigzag-view";
import { useRouter } from "expo-router";

const TicketPage = () => {
  const { ticket } = useUser();
  const router = useRouter();
  return (
    <>
      <Header title={"BİLET DETAY "} home={true} logout={true} />
      <Box py={4} px={12}>
        <ZigzagView
          backgroundColor={"transparent"}
          surfaceColor={"#ededed"}
          top={false}
        >
          <VStack
            borderColor={"text.200"}
            borderWidth={16}
            borderBottomWidth={0}
            justifyContent={"center"}
            py={5}
            space={2}
          >
            <Heading
              size="xl"
              fontWeight="600"
              alignSelf={"center"}
              color="#002B5B"
              fontFamily={"Play"}
            >
              {ticket.ticketDetail.company} TURİZM
            </Heading>
            <Box alignItems={"center"}>
              <Text>
                {ticket.ticketRoute.from} - {ticket.ticketRoute.to}
              </Text>
              <Text>
                {ticket.ticketRoute.date} ({ticket.ticketDetail.time})
              </Text>
              <HStack space={2} alignItems={"center"} mt={2}>
                <Text bold>
                  {ticket.seats.length > 1 ? "KOLTUKLAR: " : " KOLTUK NO:"}
                </Text>
                {ticket.seats.map((item) => (
                  <Badge
                    alignContent={"center"}
                    rounded={"lg"}
                    key={item}
                    colorScheme={"success"}
                  >
                    {item}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </VStack>
        </ZigzagView>
        <Box
          style={{
            backgroundColor: "#d4d4d4",
            height: 60,
            width: 60,
            borderRadius: "50%",
            display: "absolute",
            left: -30,
            bottom: -30,
            zIndex: 999,
            marginTop: -60,
          }}
        />
        <Box
          style={{
            backgroundColor: "#d4d4d4",
            height: 60,
            width: 60,
            alignSelf: "flex-end",
            borderRadius: "50%",
            display: "absolute",
            right: -30,
            bottom: -30,
            zIndex: 999,
            marginTop: -60,
          }}
        />

        <ZigzagView backgroundColor={"transparent"} surfaceColor={"#ededed"}>
          <Box
            borderColor={"text.200"}
            borderWidth={16}
            borderTopWidth={0}
            borderBottomWidth={0}
            justifyContent={"space-between"}
            p={8}
          >
            <VStack space={1}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={16} bold>
                  MÜŞTERİ BİLGİLERİ
                </Text>
              </HStack>
              <VStack space={2}>
                <HStack>
                  <Text bold>Kimlik No: </Text>
                  <Text>{ticket.ticketRoute.user.identificationNumber}</Text>
                </HStack>
                <HStack>
                  <Text bold>Ad Soyad: </Text>
                  <Text>{ticket.ticketRoute.user.name}</Text>
                </HStack>
                <HStack>
                  <Text bold>Cinsiyet :</Text>
                  <Text>{ticket.ticketRoute.user.sex}</Text>
                </HStack>
                <HStack>
                  <Text bold>Doğum Tarihi :</Text>
                  <Text>{ticket.ticketRoute.user.dateOfBirth}</Text>
                </HStack>
                <HStack>
                  <Text bold>Mail Adresi :</Text>
                  <Text>{ticket.ticketRoute.user.email}</Text>
                </HStack>

                <HStack space={2}>
                  <Text bold>Toplam Tutar:</Text>
                  <Text>{ticket.price} ₺</Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </ZigzagView>
        <VStack space={3} pt={3}>
          <VStack alignItems={"center"}>
            <Text>Biletiniz başarıyla oluşturuldu.</Text>
            <Text>LOJIPASS 'i seçtiğiniz için teşekkürler..</Text>
          </VStack>
          <Button
            backgroundColor={"#002B5B"}
            onPress={() => router.replace("/TicketInquiryPage")}
          >
            ANASAYFAYA DÖN
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default TicketPage;
