import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BlurLayout from "./BlurLayout";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import * as Speech from "expo-speech";
import expoSpeech from "@/utils/speech/expoSpeech";

const LoadingComponent = () => {
  const [speechSettings, setSpeechSettings] = useState<{
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadSpeechSetting = async (): Promise<void> => {
        const getSetting = await loadSpeechSettings();
        setSpeechSettings(getSetting);

        Speech.stop();

        setTimeout(() => {
          expoSpeech("Đang tải dữ liệu", speechSettings);
        }, 30000);
      };

      loadSpeechSetting();

      return () => {};
    }, [])
  );

  return (
    <SafeAreaProvider>
      <BlurLayout>
        <View
          className="h-full justify-center items-center"
          accessibilityLabel="Đang tải..."
        >
          <ActivityIndicator size="large" color="#8c52ff" />
          <Text className="text-white">Đang tải...</Text>
        </View>
      </BlurLayout>
    </SafeAreaProvider>
  );
};

export default LoadingComponent;
