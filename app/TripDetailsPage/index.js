import { View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import {
  HStack,
  ScrollView,
  VStack,
  Badge,
  Text,
  Box,
  Image,
  Divider,
  Pressable,
  Button,
} from "native-base";
import { useUser } from "../../context/UserContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Wheel from "../../assets/images/wheel.png";
const TripDetailsPage = () => {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState([]);

  const { ticketRoute, ticketDetail, user, createFullTicket } = useUser();
  const handleSelectSeat = (seat) => {
    setSelectedSeat((prev) => {
      return selectedSeat
        ? prev.includes(seat)
          ? prev.filter((item) => item !== seat)
          : selectedSeat.length === 5
          ? (console.log("5 koltuktan fazla seçemezsiniz"), prev)
          : [...prev, seat]
        : seat;
    });
  };
  return (
    <View>
      <Header title="SEFER DETAY" back={true} />
      <VStack h={"100%"} space={5}>
        <Badge
          variant={"subtle"}
          colorScheme="text"
          borderWidth={1}
          mx={"auto"}
          mt={4}
          w={"90%"}
          p={5}
          opacity={0.6}
          shadow={"5"}
          borderRadius={10}
          justifyContent={"space-between"}
        >
          <HStack space={2} alignItems={"center"}>
            <MaterialIcons name="directions-bus" size={40} color="black" />
            <VStack space={1}>
              <Text fontSize={16} underline bold>
                SEFER DETAYLARI
              </Text>
              <HStack space={2}>
                <Text bold>Firma:</Text>
                <Text>{ticketDetail.company} TURİZM</Text>
              </HStack>
              <HStack space={2}>
                <Text bold>Kalkış:</Text>
                <Text>{ticketRoute.from}</Text>
                <Text bold>Varış:</Text>
                <Text>{ticketRoute.to}</Text>
              </HStack>
              <HStack space={2}>
                <Text bold>Tarih:</Text>
                <Text>{ticketRoute.date}</Text>
                <Text bold>Saat:</Text>
                <Text>{ticketDetail.time}</Text>
              </HStack>
              <HStack space={2}>
                <Text bold>Fiyat:</Text>
                <Text>{ticketDetail.price} ₺</Text>
              </HStack>
            </VStack>
          </HStack>
        </Badge>
        <Box
          h={"32%"}
          w={"90%"}
          alignSelf={"center"}
          borderColor={"#002B5B"}
          borderRadius={10}
          borderBottomLeftRadius={30}
          borderTopLeftRadius={30}
          borderWidth={1}
          backgroundColor={"text.200"}
          shadow={"9"}
        >
          <HStack m={2} mx={4} justifyContent={"space-around"}>
            <HStack space={1}>
              <MaterialCommunityIcons
                name="seat-passenger"
                size={20}
                color={"#002B5B"}
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
              <Text>Dolu - Erkek</Text>
            </HStack>
            <Divider mx={5} orientation="vertical" alignSelf={"flex-end"} />
            <HStack space={1}>
              <MaterialCommunityIcons
                name="seat-passenger"
                size={20}
                color={"#DB005B"}
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
              <Text>Dolu - Kadın</Text>
            </HStack>
            <Divider mx={5} orientation="vertical" alignSelf={"flex-end"} />
            <HStack space={1}>
              <MaterialCommunityIcons
                name="seat-passenger"
                size={20}
                color={"gray"}
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
              <Text>Boş Koltuk</Text>
            </HStack>
          </HStack>

          <ScrollView
            horizontal
            h={"50%"}
            p={2}
            showsHorizontalScrollIndicator={false}
          >
            <VStack space={5} justifyContent={"flex-end"}>
              <Image
                source={Wheel}
                alt="Wheel"
                w={10}
                style={{
                  transform: [{ rotate: "-90deg" }],
                }}
                h={10}
                mb={5}
              />
            </VStack>
            <Divider
              mx={5}
              orientation="vertical"
              h={"50%"}
              alignSelf={"flex-end"}
            />
            <VStack space={10} pr={10}>
              <HStack>
                {ticketDetail.fullSeats.map((seat) => {
                  return (
                    [3, 6, 9, 10, 14, 17, 20].includes(seat.seatNumber) &&
                    (seat.seatNumber === 10 ? (
                      <Box
                        key={seat.seatNumber + "kapı"}
                        w={"10"}
                        h={"6"}
                        ml={4}
                      ></Box>
                    ) : (
                      <Pressable
                        key={seat.seatNumber}
                        onPress={() => {
                          seat.seatState === "full"
                            ? console.log("bu koltuk dolu")
                            : handleSelectSeat(seat.seatNumber);
                        }}
                      >
                        <Box>
                          <Text
                            style={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              zIndex: 3,
                              fontSize: 14,
                              fontWeight: "bold",
                              color:
                                seat.seatState === "full"
                                  ? seat.seatGender === "Erkek"
                                    ? "#002B5B"
                                    : "#DB005B"
                                  : selectedSeat.includes(seat.seatNumber)
                                  ? "green"
                                  : "gray",
                            }}
                          >
                            {seat.seatNumber}
                          </Text>
                          <MaterialCommunityIcons
                            zIndex={2}
                            name="seat-passenger"
                            key={seat.seatNumber}
                            size={50}
                            color={
                              seat.seatState === "full"
                                ? seat.seatGender === "Erkek"
                                  ? "#002B5B"
                                  : "#DB005B"
                                : selectedSeat.includes(seat.seatNumber)
                                ? "green"
                                : "gray"
                            }
                            style={{ transform: [{ rotateY: "180deg" }] }}
                          />
                        </Box>
                      </Pressable>
                    ))
                  );
                })}
              </HStack>
              <VStack>
                <HStack>
                  {ticketDetail.fullSeats.map((seat) => {
                    return (
                      [2, 5, 8, 11, 13, 16, 19].includes(seat.seatNumber) && (
                        <Pressable
                          key={seat.seatNumber}
                          onPress={() => {
                            seat.seatState === "full"
                              ? console.log("Bu koltuk doludur")
                              : ticketDetail.fullSeats[seat.seatNumber - 1]
                                  .seatGender === user.sex ||
                                ticketDetail.fullSeats[seat.seatNumber - 1]
                                  .seatGender === ""
                              ? handleSelectSeat(seat.seatNumber)
                              : console.log(
                                  "Bu koltuk cinsiyetinize uygun değildir"
                                );
                          }}
                        >
                          <Box>
                            <Text
                              style={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                zIndex: 3,
                                fontSize: 14,
                                fontWeight: "bold",
                                color:
                                  seat.seatState === "full"
                                    ? seat.seatGender === "Erkek"
                                      ? "#002B5B"
                                      : "#DB005B"
                                    : selectedSeat.includes(seat.seatNumber)
                                    ? "green"
                                    : "gray",
                              }}
                            >
                              {seat.seatNumber}
                            </Text>
                            <MaterialCommunityIcons
                              zIndex={2}
                              name="seat-passenger"
                              key={seat.seatNumber}
                              size={50}
                              color={
                                seat.seatState === "full"
                                  ? seat.seatGender === "Erkek"
                                    ? "#002B5B"
                                    : "#DB005B"
                                  : selectedSeat.includes(seat.seatNumber)
                                  ? "green"
                                  : "gray"
                              }
                              style={{ transform: [{ rotateY: "180deg" }] }}
                            />
                          </Box>
                        </Pressable>
                      )
                    );
                  })}
                </HStack>
                <HStack>
                  {ticketDetail.fullSeats.map((seat) => {
                    return (
                      [1, 4, 7, 10, 12, 15, 18].includes(seat.seatNumber) && (
                        <Pressable
                          key={seat.seatNumber}
                          onPress={() => {
                            console.log(
                              ticketDetail.fullSeats[seat.seatNumber]
                            );
                            seat.seatState === "full"
                              ? console.log("Bu koltuk doludur")
                              : ticketDetail.fullSeats[seat.seatNumber]
                                  .seatGender === user.sex ||
                                ticketDetail.fullSeats[seat.seatNumber]
                                  .seatGender === ""
                              ? handleSelectSeat(seat.seatNumber)
                              : console.log(
                                  `Bu koltuk cinsiyetinize uygun değildir`
                                );
                          }}
                        >
                          <Box>
                            <Text
                              style={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                zIndex: 3,
                                fontSize: 14,
                                fontWeight: "bold",
                                color:
                                  seat.seatState === "full"
                                    ? seat.seatGender === "Erkek"
                                      ? "#002B5B"
                                      : "#DB005B"
                                    : selectedSeat.includes(seat.seatNumber)
                                    ? "green"
                                    : "gray",
                              }}
                            >
                              {seat.seatNumber}
                            </Text>
                            <MaterialCommunityIcons
                              zIndex={2}
                              name="seat-passenger"
                              key={seat.seatNumber}
                              size={50}
                              color={
                                seat.seatState === "full"
                                  ? seat.seatGender === "Erkek"
                                    ? "#002B5B"
                                    : "#DB005B"
                                  : selectedSeat.includes(seat.seatNumber)
                                  ? "green"
                                  : "gray"
                              }
                              style={{ transform: [{ rotateY: "180deg" }] }}
                            />
                          </Box>
                        </Pressable>
                      )
                    );
                  })}
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>
        </Box>
        {selectedSeat.length > 0 ? (
          <VStack>
            <Badge
              backgroundColor={"transparent"}
              px={3}
              borderRadius={7}
              justifyContent={"flex-start"}
              alignItems={"center"}
              alignSelf={"center"}
              w={"90%"}
            >
              <HStack space={1}>
                <Text bold>Seçilen Koltuklar ({selectedSeat.length}) :</Text>
                {selectedSeat.map((item) => (
                  <Badge key={item} rounded={"lg"} colorScheme={"success"}>
                    {item}
                  </Badge>
                ))}
              </HStack>
            </Badge>
            <HStack space={3} justifyContent={"space-between"} mx={10} pt={3}>
              <VStack>
                <Text underline fontSize={16} bold>
                  Toplam Tutar:
                </Text>
                <Text alignSelf={"flex-end"} fontSize={20}>
                  {selectedSeat.length * ticketDetail.price} ₺
                </Text>
              </VStack>

              <Button
                backgroundColor={"#002B5B"}
                onPress={() => {
                  createFullTicket({
                    seats: selectedSeat,
                    price: selectedSeat.length * ticketDetail.price,
                  });
                  router.push("/PaymentPage");
                }}
              >
                ÖDEMEYE GEÇ
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Badge
            backgroundColor={"transparent"}
            px={5}
            py={10}
            borderRadius={7}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            alignSelf={"center"}
          >
            <HStack space={3}>
              <Text bold>Devam etmeden önce lütfen koltuk seçimi yapın...</Text>
            </HStack>
          </Badge>
        )}
      </VStack>
    </View>
  );
};

export default TripDetailsPage;
