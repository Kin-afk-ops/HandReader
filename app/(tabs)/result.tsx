import Header from "@/components/Header";
import LayoutScreen from "@/components/LayoutScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as Speech from "expo-speech";
import { useFocusEffect } from "expo-router";

const Result = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      // Reset lại khi tro ve result
      setTextResult(null);
      console.log("tro ve");

      return () => {
        // cleanup khi rời đi (tuỳ chọn)
      };
    }, [])
  );

  // 1. Load photo từ AsyncStorage
  const getPhotoBase64 = async (): Promise<void> => {
    try {
      const fileUri = await AsyncStorage.getItem("photo_uri");
      setPhoto(fileUri); // sau khi có, trigger effect bên dưới
      console.log(fileUri);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPhotoBase64();
    console.log("co load");
  }, []);

  // 2. Khi photo đã có, gọi OCR API
  useEffect(() => {
    const getTextResult = async (): Promise<void> => {
      try {
        if (photo) {
          const base64 = await FileSystem.readAsStringAsync(photo, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const res = await axios.post(
            "https://primate-crucial-blatantly.ngrok-free.app/ocr",
            {
              base64_img: base64,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          setTextResult(res?.data.response_message);

          if (res?.data.response_message) {
            Speech.speak(
              "Văn bản mà bạn muốn đọc là: " + res?.data.response_message,
              {
                language: "vi-VN",
                rate: 1.0,
                pitch: 1.0,
              }
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (photo) getTextResult();
  }, [photo]); // ✅ chạy lại khi photo được cập nhật

  return (
    <LayoutScreen>
      <View className="relative">
        <Header />

        {/* {onCamera ? (
          <View className="h-[300px] w-[300px] mt-8 rounded-[10px]">
            <CameraModule
              takePhoto={takePhoto}
              setTakePhoto={setTakePhoto}
              setPhoto={setPhoto}
              photo={photo}
            />
          </View>
        ) : (
          <View className="w-full bg-red-400 h-[300px] mt-8 rounded-[10px]"></View>
        )} */}

        {photo && (
          <View className="w-[300px] h-[400px] mt-8 rounded-[10px] overflow-hidden relative">
            <Image className="w-full h-full " source={{ uri: photo }} />
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
        )}

        {/* {photo && (
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
        )} */}

        {/* <SupportBlock /> */}
      </View>
    </LayoutScreen>
  );
};

export default Result;
