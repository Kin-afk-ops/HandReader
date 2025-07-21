import * as Speech from "expo-speech";

const expoSpeech = (
  text: string,
  settings: {
    voice: string;
    rate: number;
    pitch: number;
    language: string;
  } | null
): void => {
  Speech.speak(text, {
    voice: settings?.voice || undefined,
    rate: settings?.rate ?? 0.85,
    pitch: settings?.pitch ?? 1.0,
    language: settings?.language ?? "vi-VN",
  });
};

export default expoSpeech;
