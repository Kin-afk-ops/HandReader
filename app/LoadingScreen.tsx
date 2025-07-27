import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import expoSpeech from "@/utils/speech/expoSpeech";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";

const LoadingScreen = () => {
  useFocusEffect(
    useCallback(() => {
      const speechLoading = async (): Promise<void> => {
        const getSetting = await loadSpeechSettings();
        expoSpeech("Đang tải dữ liệu", getSetting);

        setTimeout(() => {
          expoSpeech("Đang thực hiện, xin hãy chờ đợi", getSetting);
        }, 5000);
      };

      speechLoading();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaProvider>
      <LayoutScreen>
        <BlurLayout>
          <View
            className="h-full justify-center items-center"
            accessibilityLabel="Đang tải..."
          >
            <ActivityIndicator size="large" color="#8c52ff" />
            <Text className="text-white">Đang tải...</Text>
          </View>
        </BlurLayout>
      </LayoutScreen>
    </SafeAreaProvider>
  );
};

export default LoadingScreen;
