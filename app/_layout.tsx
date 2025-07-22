import { Stack, useRouter } from "expo-router";
import "./globals.css";
import Header from "@/components/Header";
import { HighContrastProvider } from "@/contexts/HighContrastContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { AppInitializer } from "./AppInitializer";

export default function RootLayout() {
  const { user, setUser } = useUser();

  useEffect(() => {
    console.log("Giá trị user trong Provider đã đổi:", user);
  }, [user]);

  console.log(user);

  return (
    <UserProvider>
      <HighContrastProvider>
        <Stack>
          <Stack.Screen
            name="AppInitializer"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </HighContrastProvider>
    </UserProvider>
  );
}
