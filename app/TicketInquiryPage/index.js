import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Select,
  Box,
  Heading,
  Center,
  VStack,
  Text,
  Button,
  Divider,
  CheckIcon,
  HStack,
  Input,
  useToast,
  Pressable,
} from "native-base";
import { useUser } from "../../context/UserContext";
import { router } from "expo-router";
import cities from "../../assets/cities.json";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToastAlertBox from "../../components/ToastAlertBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TicketInquiryPage = () => {
  const { user, createTicketRoute } = useUser();
  const toast = useToast();
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [allCities, setAllCities] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    setAllCities(Object.keys(cities).map((key) => cities[key]));
  }, []);

  return (
    <>
      <Header title="BİLET ARA" logout={true} />
      <Center h={"full"} py={10} gap={5}>
        <Heading
          flex={1}
          size="xl"
          fontWeight="600"
          color="#002B5B"
          _dark={{
            color: "warmGray.50",
          }}
          fontFamily={"Play"}
        >
          LOJIPASS
        </Heading>
        <HStack
          w={"90%"}
          flex={5}
          space={5}
          borderColor={"#002B5B"}
          borderWidth={0.5}
          borderRadius={10}
          px={5}
        >
          <VStack flex={2} space={5} justifyContent={"center"}>
            <MaterialIcons name="location-pin" size={24} color="#002B5B" />
            <Box>
              <MaterialIcons name="more-vert" size={24} color="#002B5B" />
              <MaterialIcons name="more-vert" size={24} color="#002B5B" />
            </Box>
            <MaterialIcons name="pin-drop" size={24} color="#002B5B" />
          </VStack>
          <VStack w={"90%"} flex={10} space={4} p={5}>
            <Box flex={2}>
              <Text>Nereden?</Text>
              <Select
                selectedValue={fromCity}
                w={"100%"}
                alignSelf={"center"}
                borderRadius={10}
                borderColor={"#002B5B"}
                placeholder="Bulunduğunuz Şehir"
                _selectedItem={{
                  bg: "text.500",

                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setFromCity(itemValue)}
              >
                {allCities.map((city) => {
                  return <Select.Item label={city} value={city} key={city} />;
                })}
              </Select>
            </Box>
            <Divider bgColor={"text.500"} w={"170"} />
            <Box flex={2}>
              <Text>Nereye?</Text>
              <Select
                selectedValue={toCity}
                alignSelf={"center"}
                w={"100%"}
                borderRadius={10}
                borderColor={"#002B5B"}
                placeholder="Gideceğiniz Şehir"
                _selectedItem={{
                  bg: "text.500",

                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setToCity(itemValue)}
              >
                {allCities.map((city) => {
                  return <Select.Item label={city} value={city} key={city} />;
                })}
              </Select>
            </Box>
          </VStack>
          <VStack justifyContent={"center"}>
            <Pressable
              onPress={() => {
                let temp = fromCity;
                setFromCity(toCity);
                setToCity(temp);
              }}
            >
              <MaterialIcons name="swap-vert" size={30} color="#002B5B" />
            </Pressable>
          </VStack>
        </HStack>
        <HStack
          gap={20}
          w={"90%"}
          flex={1}
          borderColor={"#002B5B"}
          borderWidth={0.5}
          borderRadius={10}
          px={"5"}
          space={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <MaterialIcons
            name="date-range"
            onPress={showDatePicker}
            size={24}
            color="#002B5B"
          />
          <Text>Sefer Tarihi:</Text>
          <Input
            w={"70%"}
            variant={"outline"}
            _focus={{
              borderColor: "#002B5B",
            }}
            value={date ? date : "Tarih Seçmek İçin Dokunun"}
            isDisabled
            onPressIn={showDatePicker}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            locale="tr_TR"
            minimumDate={new Date()}
            date={new Date()}
            onConfirm={(e) => {
              hideDatePicker();
              setDate(e.toLocaleDateString());
            }}
            onCancel={() => {
              hideDatePicker();
            }}
          />
        </HStack>

        <VStack alignItems={"center"} flex={5} w={"90%"} space={3}>
          <Button
            backgroundColor={"#002B5B"}
            onPress={() => {
              if (!fromCity || !toCity || !date) {
                toast.show({
                  render: () => {
                    return (
                      <ToastAlertBox
                        description={"LÜTFEN TÜM ALANLARI DOLDURUN!"}
                      />
                    );
                  },
                });
                return;
              }
              createTicketRoute({
                user: user,
                from: fromCity,
                to: toCity,
                date: date,
              });
              router.push("/TripSelectionPage");
            }}
            w={"75%"}
          >
            SEFERLERİ GETİR
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default TicketInquiryPage;
