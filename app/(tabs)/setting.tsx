import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import LayoutScreen from "@/components/LayoutScreen";
import BlurLayout from "@/components/BlurLayout";
import SpeedSlider from "@/components/SpeedSlider";
import CustomSwitchLabelSmall from "@/components/CustomSwitchLabelSmall";
import SupportBlock from "@/components/SupportBlock";
import {
  loadSpeechSettings,
  saveSpeechSettings,
} from "@/utils/speech/speechSettings";
import expoSpeech from "@/utils/speech/expoSpeech";
import * as Speech from "expo-speech";
import { router, useFocusEffect } from "expo-router";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import {
  loadHightContrastMode,
  saveHightContrastMode,
} from "@/utils/hightContrastMode/hightContrastMode";
import { useHighContrast } from "@/contexts/HighContrastContext";
import LoadingScreen from "../LoadingScreen";

const Setting = () => {
  // const [hightContrastMode, setHightContrastMode] = useState<boolean>(false);
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

    // const loadHightContrastModeSetting = async (): Promise<void> => {
    //   const getHightContrastMode = await loadHightContrastMode();
    //   setHightContrastMode(getHightContrastMode);
    // };

    loadSpeechSetting();

    // loadHightContrastModeSetting();
  }, []);

  const reduceSpeed = async (): Promise<void> => {
    if (speechSettings?.rate === 0.25) {
      expoSpeech(
        `Tốc độ đọc hiện tại là 0.25 không thể giảm đuọc nữa`,
        speechSettings
      );
    } else {
      setSpeechSettings((prev) => {
        if (!prev) return null; // hoặc xử lý mặc định

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

  // useEffect(() => {
  //   const saveHightContrast = async (): Promise<void> => {
  //     await saveHightContrastMode(hightContrastMode);

  //     const load = await loadHightContrastMode();
  //   };

  //   saveHightContrast();
  // }, [hightContrastMode]);

  const increaseSpeed = async (): Promise<void> => {
    if (speechSettings?.rate === 2) {
      expoSpeech(
        `Tốc độ đọc hiện tại là 2 không thể tăng đuọc nữa`,
        speechSettings
      );
    } else {
      setSpeechSettings((prev) => {
        if (!prev) return null; // hoặc xử lý mặc định

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

  const onChangeVoiceGender = (state: boolean): void => {
    if (state) {
      setSpeechSettings((prev) => {
        if (!prev) return null; // hoặc xử lý mặc định

        const newVoice = "vi-vn-x-vie-local";

        setTimeout(() => {
          expoSpeech(`Đã chuyển giọng đọc văn bản sang nữ`, {
            voice: newVoice,
            rate: prev.rate,
            pitch: prev.pitch,
            language: prev.language,
          });
        }, 100);

        return {
          ...prev,
          voice: newVoice,
        };
      });
    } else {
      setSpeechSettings((prev) => {
        if (!prev) return null; // hoặc xử lý mặc định

        const newVoice = "vi-vn-x-vid-local";

        setTimeout(() => {
          expoSpeech(`Đã chuyển giọng đọc văn bản sang nam`, {
            voice: newVoice,
            rate: prev.rate,
            pitch: prev.pitch,
            language: prev.language,
          });
        }, 100);

        return {
          ...prev,
          voice: newVoice,
        };
      });
    }
  };

  // const listVoices = async () => {
  //   const voices = await Speech.getAvailableVoicesAsync();
  //   const vietnameseVoices = voices.filter((voice) =>
  //     voice.language.toLowerCase().startsWith("vi")
  //   );

  //   expoSpeech("Xin chào mình là Linh đây", {
  //     voice: "vi-vn-x-vid-local",
  //     rate: 1.0,
  //     pitch: 1.0,
  //     language: "vi-VN",
  //   });
  // };

  // listVoices();
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
              Chọn giọng đọc
            </Text>
            <View className="w-[40%]">
              <CustomSwitchLabelSmall
                label1="Nam"
                label2="Nữ"
                stateInitValue={
                  speechSettings?.voice === "vi-vn-x-vie-local" ? true : false
                }
                onToggle={onChangeVoiceGender}
              />
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
        <SupportBlock />
      </View>
    </LayoutScreen>
  );
};

export default Setting;
