import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import CustomSwitchLabelSmall from "@/components/CustomSwitchLabelSmall";
import {
  loadSpeechSettings,
  saveSpeechSettings,
} from "@/utils/speech/speechSettings";
import expoSpeech from "@/utils/speech/expoSpeech";
import * as Speech from "expo-speech";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useHighContrast } from "@/contexts/HighContrastContext";
import LoadingScreen from "../LoadingScreen";

const Setting = () => {
  const { mode, setMode } = useHighContrast();
  const [loading, setLoading] = useState<boolean>(false);

  const [speechSettings, setSpeechSettings] = useState<{
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null>(null);
  useEffect(() => {
    const loadSpeechSetting = async (): Promise<void> => {
      const getSetting = await loadSpeechSettings();
      setSpeechSettings(getSetting);
    };

    loadSpeechSetting();
  }, []);

  const reduceSpeed = async (): Promise<void> => {
    if (speechSettings?.rate === 0.25) {
      expoSpeech(
        `Tốc độ đọc hiện tại là 0.25 không thể giảm đuọc nữa`,
        speechSettings
      );
    } else {
      setSpeechSettings((prev) => {
        if (!prev) return null;

        const newRate = Math.max(
          0.25,
          parseFloat((prev.rate - 0.25).toFixed(2))
        );

        setTimeout(() => {
          expoSpeech(`Đã giảm tốc độ đọc còn ${newRate}`, {
            voice: prev.voice,
            rate: newRate,
            pitch: prev.pitch,
            language: prev.language,
          });
        }, 100);

        return {
          ...prev,
          rate: newRate,
        };
      });
    }
  };

  useEffect(() => {
    const saveSpeech = async (): Promise<void> => {
      if (speechSettings) {
        await saveSpeechSettings(speechSettings);
      }
    };

    saveSpeech();
  }, [speechSettings]);

  const increaseSpeed = async (): Promise<void> => {
    if (speechSettings?.rate === 2) {
      expoSpeech(
        `Tốc độ đọc hiện tại là 2 không thể tăng đuọc nữa`,
        speechSettings
      );
    } else {
      setSpeechSettings((prev) => {
        if (!prev) return null;
        const newRate = Math.min(2, parseFloat((prev.rate + 0.25).toFixed(2)));

        setTimeout(() => {
          expoSpeech(`Đã tăng tốc độ đọc lên ${newRate}`, {
            voice: prev.voice,
            rate: newRate,
            pitch: prev.pitch,
            language: prev.language,
          });
        }, 100);

        return {
          ...prev,
          rate: newRate,
        };
      });
    }
  };

  const onChangeHightCOntrastMode = (state: boolean) => {
    if (state) {
      setMode(false);

      setTimeout(() => {
        expoSpeech("Đã tắt chế độ tương phản cao", speechSettings);
      }, 100);
    } else {
      setMode(true);

      setTimeout(() => {
        expoSpeech("Đã bật chế độ tương phản cao", speechSettings);
      }, 100);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <LayoutScreen>
      <Header screenType="Màn hình cài đặt" />
      <View className="relative">
        <BlurLayout>
          <View className="bg-white w-full px-4 py-4 rounded-[10px]">
            <Text className="text-secondary text-xl">Tốc độ đọc văn bản</Text>

            <View className="flex-row w-full justify-center items-center">
              <TouchableOpacity
                className="rounded-full border border-[#ccc]"
                accessibilityLabel="Giảm tốc độ đọc văn bản"
                onPress={reduceSpeed}
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={45}
                  color="#5f605a"
                />
              </TouchableOpacity>
              {speechSettings && (
                <Text className="text-[20px] px-8">{speechSettings?.rate}</Text>
              )}

              <TouchableOpacity
                className="rounded-full border border-[#ccc]"
                accessibilityLabel="Tăng tốc độ đọc văn bản"
                onPress={increaseSpeed}
              >
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={45}
                  color="#5f605a"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white w-full px-4 py-4 rounded-[10px] mt-8 flex-row items-center">
            <Text className="text-secondary text-xl w-[60%]">
              Chế độ tương phản cao
            </Text>
            <View className=" w-[40%]">
              <CustomSwitchLabelSmall
                label1="Bật"
                label2="Tắt"
                onToggle={onChangeHightCOntrastMode}
                stateInitValue={!mode}
              />
            </View>
          </View>
        </BlurLayout>
      </View>
    </LayoutScreen>
  );
};

export default Setting;
