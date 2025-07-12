import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import LayoutScreen from "@/components/LayoutScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SupportBlock from "@/components/SupportBlock";
import Header from "@/components/Header";
import { Redirect, useRouter } from "expo-router";
import CameraModule from "@/components/CameraModule";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import axios from "axios";
import * as Speech from "expo-speech";

export default function Index() {
  const router = useRouter();
  const [takePhoto, setTakePhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [isCameraScreen, setIsCameraScreen] = useState<boolean>(true);
  console.log(isCameraScreen);

  useEffect(() => {
    Speech.speak("Bạn đang ở màn hình camera", {
      language: "vi-VN",
      pitch: 1.0,
      rate: 1.0,
    });

    const backAction = () => {
      // Nếu bạn muốn tự xử lý (ví dụ: xác nhận thoát)
      Speech.stop();

      Speech.speak("Bạn đang ở màn hình camera", {
        language: "vi-VN",
        pitch: 1.0,
        rate: 1.0,
      });

      setPhoto(null);
      setTakePhoto(false);
      setTextResult(null);
      setIsCameraScreen(true);
      router.push("/");

      return true; // Ngăn mặc định
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  useEffect(() => {
    const readNotification = () => {
      Speech.speak(
        "Bạn đang ở màn hình kết quả. Vuốt sang trái hoặc ấn nút trở về để quay lại màn hình Camera.",
        {
          language: "vi-VN", // 🇻🇳 tiếng Việt
          rate: 1.0, // tốc độ đọc
          pitch: 1.0, // độ cao giọng
        }
      );
      getTextResults();
    };

    const getTextResults = async (): Promise<void> => {
      try {
        const res = await axios.post(
          "https://primate-crucial-blatantly.ngrok-free.app/ocr",
          {
            base64_img: photo.base64,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTextResult(res?.data.response_message);

        if (!res?.data.response_message || isCameraScreen) return;

        Speech.speak(res?.data.response_message, {
          language: "vi-VN", // 🇻🇳 tiếng Việt
          rate: 1.0, // tốc độ đọc
          pitch: 1.0, // độ cao giọng
        });

        if (isCameraScreen) Speech.stop();
      } catch (error) {
        console.log(error);
      }
    };

    if (photo) {
      readNotification();
    }
  }, [photo, isCameraScreen]);

  return (
    <LayoutScreen>
      <View className="relative">
        <Header />

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
              onPress={() => {
                Speech.stop();
                setPhoto(null);
                setTakePhoto(false);
                setTextResult(null);

                Speech.speak("Bạn đang ở màn hình Camera", {
                  language: "vi-VN", // 🇻🇳 tiếng Việt
                  rate: 1.0, // tốc độ đọc
                  pitch: 1.0, // độ cao giọng
                });
              }}
            >
              <Text className="text-xl">Trờ về Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="mt-12 items-center"
            onPress={() => {
              Speech.stop();
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
