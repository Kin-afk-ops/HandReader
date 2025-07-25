import { Stack, useRouter } from "expo-router";
import "./globals.css";
import Header from "@/components/Header";
import { HighContrastProvider } from "@/contexts/HighContrastContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <HighContrastProvider>
        <NotificationProvider>
          <Stack>
            <Stack.Screen
              name="AppInitializer"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </NotificationProvider>
      </HighContrastProvider>
    </UserProvider>
  );
}
