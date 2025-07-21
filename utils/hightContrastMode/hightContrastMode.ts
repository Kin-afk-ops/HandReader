import AsyncStorage from "@react-native-async-storage/async-storage";

import { NativeEventEmitter } from "react-native";

export const hightCOntrastModeDefault = false;

export const saveHightContrastMode = async (hightContrast: boolean) => {
  try {
    await AsyncStorage.setItem(
      "@hightContrastMode",
      JSON.stringify(hightContrast)
    );
  } catch (e) {
    console.error("Lỗi lưu cài đặt:", e);
  }
};

export const loadHightContrastMode = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem("@hightContrastMode");
    return value ? JSON.parse(value) : hightCOntrastModeDefault;
  } catch (e) {
    console.error("Lỗi tải cài đặt:", e);
    return hightCOntrastModeDefault;
  }
};

export const hightContrastModeEvents = new NativeEventEmitter();
