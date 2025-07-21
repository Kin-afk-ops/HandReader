import { Stack } from "expo-router";
import "./globals.css";
import Header from "@/components/Header";
import { HighContrastProvider } from "@/contexts/HighContrastContext";

export default function RootLayout() {
  return (
    <HighContrastProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </HighContrastProvider>
  );
}
