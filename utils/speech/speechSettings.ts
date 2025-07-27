import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";

export const defaultSpeechSettings = {
  rate: 1.0,
  pitch: 1.0,
  language: "vi-VN",
};

export const getBestVietnameseVoice = async (): Promise<string> => {
  const voices = await Speech.getAvailableVoicesAsync();

  const vietnameseVoices = voices.filter((v) =>
    v.language.toLowerCase().startsWith("vi")
  );

  // Ưu tiên giọng chất lượng cao "Enhanced"
  const enhanced = vietnameseVoices.find((v) => v.quality === "Enhanced");
  if (enhanced) return enhanced.identifier;

  // Nếu không có, chọn giọng đầu tiên tiếng Việt
  return vietnameseVoices[0]?.identifier || "";
};

export const saveSpeechSettings = async (settings: any) => {
  try {
    await AsyncStorage.setItem("@speechSettings", JSON.stringify(settings));
  } catch (e) {
    console.error("Lỗi lưu cài đặt giọng đọc:", e);
  }
};

export const loadSpeechSettings = async (): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem("@speechSettings");
    if (value) return JSON.parse(value);

    // Nếu chưa có cài đặt, lấy giọng tốt nhất và lưu lại
    const bestVoice = await getBestVietnameseVoice();
    const settings = { ...defaultSpeechSettings, voice: bestVoice };

    await saveSpeechSettings(settings);
    return settings;
  } catch (e) {
    console.error("Lỗi tải cài đặt giọng đọc:", e);
    return defaultSpeechSettings;
  }
};
