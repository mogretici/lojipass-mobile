import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import voyages from "../../assets/voyages.json";
import { useRouter, useLocalSearchParams } from "expo-router";
import Lottie from "lottie-react-native";
import {
  HStack,
  VStack,
  Box,
  Text,
  Center,
  Badge,
  ScrollView,
  Divider,
  Pressable,
} from "native-base";
import Header from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";

const TripSelectionPage = () => {
  const { ticketRoute, createTicketDetail } = useUser();
  const [availableVoyages, setAvailableVoyages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const filteredVoyages = Object.keys(voyages).filter((voyage) => {
      return (
        voyages[voyage].from === ticketRoute.from &&
        voyages[voyage].to === ticketRoute.to &&
        voyages[voyage].date === ticketRoute.date
      );
    });
    const availableVoyages = filteredVoyages.map((voyage) => voyages[voyage]);
    setAvailableVoyages(availableVoyages);
  }, []);

  return (
    <View>
      <Header title="SEFER SEÇİMİ" back />

      {availableVoyages.length > 0 ? (
        <>
          <Badge
            variant={"subtle"}
            colorScheme="text"
            borderWidth={1}
            mx={"auto"}
            mt={4}
            w={"90%"}
            p={5}
            opacity={0.4}
            shadow={2}
          >
            <Text fontSize={13} fontFamily={"Play"} textAlign={"center"}>
              {ticketRoute.from + " > " + ticketRoute.to} Güzergahında{" "}
              {ticketRoute.date} tarihli {availableVoyages.length} adet sefer
              bulunmaktadır. Uygun seferi seçerek işleme devam edebilirsiniz.
            </Text>
          </Badge>
          <ScrollView h={"70%"}>
            {availableVoyages.map((voyage) => (
              <Pressable
                onPress={() => {
                  createTicketDetail({
                    time: voyage.time,
                    company: voyage.company,
                    price: voyage.price,
                    fullSeats: voyage.fullSeats,
                  });
                  router.push({
                    pathname: "/TripDetailsPage",
                  });
                }}
                key={voyage.date + voyage.time}
              >
                <VStack px={10} pt={5}>
                  <Box
                    borderColor={"#002B5B"}
                    borderWidth={1}
                    borderRadius={14}
                    p={5}
                    backgroundColor={"#002B5B"}
                    opacity={0.9}
                    shadow={2}
                  >
                    <VStack space={1}>
                      <HStack justifyContent={"space-between"}>
                        <Text
                          color={"#ededed"}
                          fontSize={18}
                          fontFamily={"Play"}
                        >
                          {voyage.company} TURİZM
                        </Text>
                        <VStack>
                          <Text
                            fontSize={14}
                            fontFamily={"Play"}
                            color={"#ededed"}
                          >
                            SAAT:
                          </Text>
                          <Text
                            fontSize={14}
                            fontFamily={"Play"}
                            color={"#ededed"}
                          >
                            {voyage.time}
                          </Text>
                        </VStack>
                      </HStack>
                      <HStack justifyContent={"flex-start"} space={1}>
                        <Text fontSize={10} color={"#ededed"}>
                          Sefer Güzergah:
                        </Text>
                        <Text fontSize={10} color={"#ededed"}>
                          {voyage.from}
                        </Text>
                        <Text fontSize={10} color={"#ededed"}>
                          {">"}
                        </Text>
                        <Text fontSize={10} color={"#ededed"}>
                          {voyage.to}
                        </Text>
                      </HStack>
                      <HStack justifyContent={"flex-start"} space={1}>
                        <Text fontSize={10} color={"#ededed"}>
                          Sefer Tarih:
                        </Text>
                        <Text fontSize={10} color={"#ededed"}>
                          {voyage.date}
                        </Text>
                      </HStack>
                      <HStack
                        alignItems={"flex-end"}
                        justifyContent={"space-between"}
                      >
                        <Text
                          fontSize={14}
                          fontFamily={"Play"}
                          color={"#ededed"}
                        >
                          {
                            voyage.fullSeats.filter(
                              (seat) => seat.seatState !== "full"
                            ).length
                          }{" "}
                          UYGUN KOLTUK
                        </Text>
                        <VStack alignItems={"center"}>
                          <Text
                            fontSize={14}
                            fontFamily={"Play"}
                            color={"#ededed"}
                          >
                            FİYAT:
                          </Text>
                          <Text
                            fontSize={14}
                            fontFamily={"Play"}
                            color={"#ededed"}
                          >
                            {voyage.price} ₺
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <Center h={"80%"}>
          <Badge
            variant={"subtle"}
            colorScheme="text"
            borderWidth={1}
            mx={"auto"}
            mt={4}
            w={"80%"}
            p={5}
            opacity={0.4}
            shadow={8}
          >
            <Text fontSize={18} fontFamily={"Play"} textAlign={"center"}>
              Seçtiğiniz güzergah ve saatte sefer bulunmamaktadır.
            </Text>
          </Badge>
          <Box w={"100%"} h={"50%"} mt={30}>
            <Lottie
              resizeMode="cover"
              source={require("../../assets/animation.json")}
              autoPlay
              loop
            />
          </Box>
        </Center>
      )}
    </View>
  );
};

export default TripSelectionPage;
