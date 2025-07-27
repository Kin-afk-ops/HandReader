import { Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import formatVietnameseDocumentDate from "@/utils/formatVietnameseDate";
import { useFocusEffect } from "expo-router";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import * as Speech from "expo-speech";
import expoSpeech from "@/utils/speech/expoSpeech";
import axiosInstance from "@/api/axiosInstance";

interface childProp {
  history: {
    id: string;
    user_id: string;
    result_id: string;
    viewed_at: string;
    is_saved_by_user: boolean;
    recognized_text: string;
    confidence: number;
    created_at: string;
  } | null;
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
}

const HistoryItem: React.FC<childProp> = ({
  history,
  currentPlayingId,
  setCurrentPlayingId,
}) => {
  const isPlaying = currentPlayingId === history?.id;
  const [isSave, setIsSave] = useState<boolean>(false);
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
      };

      const loadSave = () => {
        if (history) {
          setIsSave(history.is_saved_by_user);
        }
      };

      loadSpeechSetting();
      loadSave();

      // Optional cleanup nếu cần
      return () => {};
    }, [])
  );

  const handlePlayAudio = () => {
    if (!history || !speechSettings) return;
    if (isPlaying) {
      Speech.stop();
      expoSpeech("Đã dừng phát văn bản", speechSettings);
      setCurrentPlayingId(null);
    } else {
      Speech.stop();
      setCurrentPlayingId(history.id);

      Speech.speak(history.recognized_text, {
        voice: speechSettings.voice,
        rate: speechSettings.rate,
        pitch: speechSettings.pitch,
        language: speechSettings.language,
        onDone: () => {
          setCurrentPlayingId(null);
        },
      });
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!history) return;

    if (isSave) {
      await axiosInstance
        .put(`/recognition-results/${history?.result_id}`, {
          is_saved_by_user: false,
        })
        .then((res) => {
          setIsSave(false);
          expoSpeech("Đã bỏ lưu văn bản thành công", speechSettings);
        })
        .catch((error) => {
          console.log(error);
          Speech.stop();
          setCurrentPlayingId(null);
          expoSpeech("Đã lỗi, ", speechSettings);
        });
    } else {
      await axiosInstance
        .put(`/recognition-results/${history?.result_id}`, {
          is_saved_by_user: true,
        })
        .then((res) => {
          setIsSave(true);
          expoSpeech("Đã lưu văn bản thành công", speechSettings);
        })
        .catch((error) => {
          console.log(error);
          Speech.stop();
          setCurrentPlayingId(null);
          expoSpeech("Đã lỗi, không lưu được", speechSettings);
        });
    }
  };

  return (
    <View className="w-full bg-white my-2 py-4 px-2 rounded-[10px] flex-row">
      <View className="w-[70%]">
        <Text className="text-[12px]">
          {history && formatVietnameseDocumentDate(history.viewed_at)}
        </Text>
      </View>

      <View className="w-[30%] flex-row justify-between">
        <TouchableOpacity
          onPress={handlePlayAudio}
          accessibilityLabel="Phát hoặc dừng đoạn văn bản"
        >
          {isPlaying ? (
            <MaterialIcons name="pause" size={40} color="#5f605a" />
          ) : (
            <MaterialIcons name="play-arrow" size={40} color="#8c52ff" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          accessibilityLabel={
            isSave
              ? "Lưu hoặc bỏ lưu văn bản. Văn bản đang lưu"
              : "Lưu hoặc bỏ lưu văn bản. Văn bản chưa lưu"
          }
        >
          {isSave ? (
            <MaterialIcons name="bookmark" size={40} color="#ffde59" />
          ) : (
            <MaterialIcons name="bookmark-border" size={40} color="#5f605a" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HistoryItem;
