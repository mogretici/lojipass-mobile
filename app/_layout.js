import { Slot } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { UserProvider } from "../context/UserContext";

export default function RootLayoutNav() {
  // #FFF5DA
  return (
    <UserProvider>
      <NativeBaseProvider>
        <Box backgroundColor={"text.300"} h={"full"}>
          <Slot />
        </Box>
      </NativeBaseProvider>
    </UserProvider>
  );
}