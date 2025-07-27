// app/(tabs)/Splash.tsx
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Splash() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className="mt-4 text-gray-700 text-base">Đang tải ứng dụng...</Text>
    </View>
  );
}
