import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BlurLayout from "@/components/BlurLayout";
import { Image } from "expo-image";
import axiosInstance from "@/api/axiosInstance";
import { useUser } from "@/contexts/UserContext";
import expoSpeech from "@/utils/speech/expoSpeech";

interface ChildProps {
  imageId: string | null;
  resultId: string | null;
  speechSettings: {
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null;
  setPhoto: React.Dispatch<React.SetStateAction<any>>;
  setResultMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultScreen: React.FC<ChildProps> = ({
  imageId,
  resultId,
  speechSettings,
  setPhoto,
  setResultMode,
}) => {
  const { user } = useUser();
  const [image, setImage] = useState<{
    id: string;
    user_id: string;
    source: string;
    image_url: string;
    image_public_key: string;
    created_at: Date;
  } | null>(null);

  const [result, setResult] = useState<{
    id: string;
    image_id: string;
    recognized_text: string;
    confidence: number;
    is_saved_by_user: boolean;
    created_at: Date;
  } | null>(null);
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  useEffect(() => {
    const getImage = async (): Promise<void> => {
      try {
        if (imageId) {
          const res = await axiosInstance.get(`/images/${imageId}`);

          setImage(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, [imageId]);

  useEffect(() => {
    const getResult = async (): Promise<void> => {
      try {
        if (resultId) {
          const res = await axiosInstance.get(
            `/recognition-results/${resultId}`
          );

          setResult(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getResult();
  }, [resultId]);

  const handleSubmit = async () => {
    if (user && feedbackContent) {
      await axiosInstance
        .post("/feedbacks", {
          result_id: resultId,
          user_id: user.id,
          message: feedbackContent,
        })
        .then((res) => {
          console.log(res.data);
          setPhoto(null);
          setResultMode(false);
          expoSpeech("Gửi phản hồi thành công", speechSettings);
        })
        .catch((error) => {
          console.log(error);
          expoSpeech("Gửi phản hồi bị lỗi", speechSettings);
        });
    }
  };

  return (
    <BlurLayout>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        className="mt-4"
      >
        <View className="flex-1">
          <View className="bg-white px-4 py-2 rounded-[10px] mt-8">
            <Text className="font-bold text-secondary text-2xl text-center">
              Đánh giá kết quả
            </Text>
            <View
              className="w-full border border-[#ccc] h-[150px] rounded-[10px] mt-4"
              accessibilityLabel={
                feedbackContent ? feedbackContent : "Nhập phản hồi về kết quả"
              }
            >
              <TextInput
                value={feedbackContent}
                onChangeText={setFeedbackContent}
                placeholder="Nhập văn bản..."
                multiline={true} // ← bật nhập nhiều dòng
                numberOfLines={4} // ← số dòng hiển thị mặc định
                textAlignVertical="top" // ← căn chữ lên đầu
                className="outline-none w-full h-full"
              />
            </View>
          </View>
          <View className="items-center mt-2">
            <TouchableOpacity
              className="px-6 py-4 bg-[#0cc0df] rounded-[10px]"
              onPress={handleSubmit}
            >
              <Text className="text-xl text-white">Gửi đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BlurLayout>
  );
};

export default ResultScreen;
