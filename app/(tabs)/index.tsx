import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import LayoutScreen from "@/components/LayoutScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SupportBlock from "@/components/SupportBlock";
import Header from "@/components/Header";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import CameraModule from "@/components/CameraModule";
import { useCallback, useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import * as Speech from "expo-speech";
import { loadSpeechSettings } from "@/utils/speech/speechSettings";
import expoSpeech from "@/utils/speech/expoSpeech";
import { useUser } from "@/contexts/UserContext";
import LoadingScreen from "../LoadingScreen";
import { useNotification } from "@/contexts/NotificationContext";

export default function Index() {
  const router = useRouter();
  const { user } = useUser();
  const { notification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [takePhoto, setTakePhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [isCameraScreen, setIsCameraScreen] = useState<boolean>(true);
  const [speechSettings, setSpeechSettings] = useState<{
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null>(null);

  const listVoices = async () => {
    const voices = await Speech.getAvailableVoicesAsync();
    const vietnameseVoices = voices.filter((voice) =>
      voice.language.toLowerCase().startsWith("vi")
    );
    console.log("Vietnamese voices:", vietnameseVoices);
  };

  // listVoices();

  useFocusEffect(
    useCallback(() => {
      const loadSpeechSetting = async (): Promise<void> => {
        const getSetting = await loadSpeechSettings();
        setSpeechSettings(getSetting);
        Speech.stop();
        setPhoto(null);
        setTakePhoto(false);
        setTextResult(null);
        setIsCameraScreen(true);
      };

      loadSpeechSetting();

      // Optional cleanup nếu cần
      return () => {};
    }, [])
  );

  useEffect(() => {
    const getTextResults = async (): Promise<void> => {
      try {
        // const res = await axios.post(
        //   "https://primate-crucial-blatantly.ngrok-free.app/ocr",
        //   {
        //     base64_img: photo.base64,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // if (!res?.data.response_message || isCameraScreen) return;
        setTextResult("hihi haha");
        setTimeout(() => {
          expoSpeech("hihi haha", speechSettings);
        }, 100);

        if (isCameraScreen) Speech.stop();
      } catch (error) {
        console.log(error);
      }
    };

    if (photo) {
      // readNotification();
      getTextResults();
    }
  }, [photo, isCameraScreen, speechSettings]);
  console.log(user);
  if (!user || !notification) return <LoadingScreen />;
  if (loading) return <LoadingScreen />;

  return (
    <LayoutScreen>
      <View className="relative">
        <Header screenType={photo ? "Màn hình kết quả" : "Màn hình Camera"} />

        {photo ? (
          <View className="w-[300px] h-[400px] mt-8 rounded-[10px] overflow-hidden relative">
            <Image
              className="w-full h-full "
              source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            />
            <BlurView
              intensity={50}
              tint="light"
              className="w-full h-full  bg-white absolute top-0 left-0 z-2"
            >
              {textResult && (
                <Text className="p-4 bg-white text-[#333] ">{textResult}</Text>
              )}
            </BlurView>
          </View>
        ) : (
          <View className="h-[400px] w-[300px] mt-8 rounded-[10px] ">
            <CameraModule
              takePhoto={takePhoto}
              setTakePhoto={setTakePhoto}
              setPhoto={setPhoto}
              photo={photo}
            />
          </View>
        )}

        {photo ? (
          <View className="w-full mt-12 items-center">
            <TouchableOpacity
              className="w-[70%] items-center px-4 py-2 bg-white border border-[#ccc] rounded-[10px]"
              accessibilityLabel="Quay về màn hình camera"
              onPress={() => {
                Speech.stop();
                setPhoto(null);
                setTakePhoto(false);
                setTextResult(null);
                setIsCameraScreen(true);
                router.push("/");
              }}
            >
              <Text className="text-xl">Trờ về Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="mt-4 items-center"
            accessibilityLabel="Chụp ảnh văn bản"
            onPress={() => {
              setTakePhoto(true);
              setIsCameraScreen(false);
            }}
          >
            <MaterialIcons name="camera-alt" size={90} color="#fff" />
          </TouchableOpacity>
        )}

        {photo && (
          <TouchableOpacity className="mt-4 items-center ">
            <Text className="bg-[#0cc0df] px-8 py-4 text-xl text-white rounded-[10px]">
              Lưu kết quả
            </Text>
          </TouchableOpacity>
        )}

        {photo && (
          <TouchableOpacity
            className="mt-2 items-center "
            onPress={() => router.push("/(tabs)/feedback")}
          >
            <Text className="bg-[#e5c95a] px-8 py-4 text-xl text-white rounded-[10px]">
              Đánh giá kết quả
            </Text>
          </TouchableOpacity>
        )}

        {/* <SupportBlock /> */}
      </View>
    </LayoutScreen>
  );
}
