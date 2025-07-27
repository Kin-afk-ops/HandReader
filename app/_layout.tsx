import { Stack } from "expo-router";
import "./globals.css";
import { HighContrastProvider } from "@/contexts/HighContrastContext";
import { UserProvider } from "@/contexts/UserContext";
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
