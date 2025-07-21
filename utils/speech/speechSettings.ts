import AsyncStorage from "@react-native-async-storage/async-storage";

export const defaultSpeechSettings = {
  voice: "vi-vn-x-vie-local", // mặc định giọng nữ
  rate: 1.0,
  pitch: 1.0,
  language: "vi-VN",
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
    return value ? JSON.parse(value) : defaultSpeechSettings;
  } catch (e) {
    console.error("Lỗi tải cài đặt giọng đọc:", e);
    return defaultSpeechSettings;
  }
};
