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
import axiosInstance from "@/api/axiosInstance";
import LoadingComponent from "@/components/LoadingComponent";
import ResultScreen from "@/components/ResultScreen";

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
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageIdForFeedback, setImageIdForFeedback] = useState<string | null>(
    null
  );
  const [resultId, setResultId] = useState<string | null>(null);
  const [resultMode, setResultMode] = useState<boolean>(false);

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
      setLoading(true);
      if (!photo || !imageId || !speechSettings || !user) return;
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

        await axiosInstance
          .post("/recognition-results/", {
            image_id: imageId,
            recognized_text: "hihi haha",
            confidence: 1,
            is_saved_by_user: false,
          })
          .then(async (res) => {
            setImageIdForFeedback(imageId);

            setImageId(null);
            await axiosInstance.post("/histories", {
              user_id: user.id,
              result_id: res.data.id,
            });
            setResultId(res.data.id);
          })
          .catch((error) => console.log(error));

        setLoading(false);
        if (isCameraScreen) Speech.stop();
      } catch (error) {
        console.log(error);
        expoSpeech("Đã lỗi", speechSettings);
      }
    };

    if (photo) {
      // readNotification();
      getTextResults();
    }
  }, [photo, isCameraScreen, speechSettings, imageId, user]);

  const handleSave = async (): Promise<void> => {
    if (resultId) {
      await axiosInstance
        .put(`/recognition-results/${resultId}`, {
          is_saved_by_user: true,
        })
        .then((res) => {
          console.log(res.data);
          expoSpeech("Đã lưu thhành công", speechSettings);
        })
        .catch((error) => {
          console.log(error);

          expoSpeech("Lưu bị lỗi", speechSettings);
        });
    }
  };

  console.log(user);
  if (!user || !notification) return <LoadingScreen />;

  return (
    <LayoutScreen>
      {resultMode ? (
        <Header screenType="Màn hình phản hồi văn bản" />
      ) : (
        <Header screenType={photo ? "Màn hình kết quả" : "Màn hình Camera"} />
      )}

      {loading ? (
        <View className="min-h-[300px]">
          <LoadingComponent />
        </View>
      ) : (
        <>
          {resultMode ? (
            <ResultScreen
              imageId={imageIdForFeedback}
              resultId={resultId}
              speechSettings={speechSettings}
              setPhoto={setPhoto}
              setResultMode={setResultMode}
            />
          ) : (
            <>
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
                      <Text className="p-4 bg-white text-[#333] ">
                        {textResult}
                      </Text>
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
                    setImageId={setImageId}
                  />
                </View>
              )}
              <View
                className={
                  photo
                    ? "flex-row justify-between flex-wrap w-full mt-1"
                    : "flex-row justify-center w-full"
                }
              >
                {photo && (
                  <TouchableOpacity
                    onPress={handleSave}
                    className=" items-center w-[40%] bg-[#28d7f6] rounded-[10px] justify-center"
                    accessibilityLabel="Lưu kết quả"
                  >
                    <MaterialIcons
                      name="bookmark-border"
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                )}

                {photo && (
                  <TouchableOpacity
                    className=" items-center bg-[#e5c95a] w-[40%]  rounded-[10px] justify-center"
                    onPress={() => setResultMode(true)}
                    accessibilityLabel="Phản hồi về kết quả"
                  >
                    <MaterialIcons name="comment" size={40} color="white" />
                  </TouchableOpacity>
                )}

                {photo ? (
                  <View className="w-full mt-6 items-center">
                    <TouchableOpacity
                      className="w-[40%] items-center bg-white border border-[#ccc] rounded-[10px]"
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
                      <MaterialIcons name="replay" size={60} />
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
              </View>
            </>
          )}
        </>
      )}
    </LayoutScreen>
  );
}
