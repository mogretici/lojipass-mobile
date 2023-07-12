import { Slot } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { UserProvider } from "../context/UserContext";

export default function RootLayoutNav() {
  return (
    <UserProvider>
      <NativeBaseProvider>
        <Box backgroundColor={"#d4d4d4"} h={"full"}>
          <Slot />
        </Box>
      </NativeBaseProvider>
    </UserProvider>
  );
}
