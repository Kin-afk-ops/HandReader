import formatVietnameseDocumentDate from "@/utils/formatVietnameseDate";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Speech from "expo-speech";
import axiosInstance from "@/api/axiosInstance";
import expoSpeech from "@/utils/speech/expoSpeech";

interface ChildProps {
  save: {
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

const SaveItem: React.FC<ChildProps> = ({
  save,
  currentPlayingId,
  setCurrentPlayingId,
}) => {
  const isPlaying = currentPlayingId === save?.id;
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
        if (save) {
          setIsSave(save.is_saved_by_user);
        }
      };

      loadSpeechSetting();
      loadSave();

      // Optional cleanup nếu cần
      return () => {};
    }, [])
  );

  const handlePlayAudio = () => {
    if (!save || !speechSettings) return;
    if (isPlaying) {
      Speech.stop();
      setCurrentPlayingId(null);
    } else {
      Speech.stop();
      setCurrentPlayingId(save.id);

      Speech.speak(save.recognized_text, {
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
    if (!save) return;

    if (isSave) {
      await axiosInstance
        .put(`/recognition-results/${save?.result_id}`, {
          is_saved_by_user: false,
        })
        .then((res) => {
          setIsSave(false);
        })
        .catch((error) => {
          console.log(error);
          Speech.stop();
          setCurrentPlayingId(null);
          expoSpeech("Đã lỗi, ", speechSettings);
        });
    } else {
      await axiosInstance
        .put(`/recognition-results/${save?.result_id}`, {
          is_saved_by_user: true,
        })
        .then((res) => {
          setIsSave(true);
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
          {" "}
          {save && formatVietnameseDocumentDate(save.created_at)}
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
          accessibilityLabel="Lưu hoặc bỏ lưu văn bản"
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

export default SaveItem;
