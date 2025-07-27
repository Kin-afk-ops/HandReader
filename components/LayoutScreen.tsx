import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useHighContrast } from "@/contexts/HighContrastContext";

const LayoutScreen = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useHighContrast();

  return (
    <LinearGradient
      colors={mode ? ["#000000", "#333333"] : ["#FFF7AD", "#FFA9F9"]}
      // colors={}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ backgroundColor: "rgba(0,0,0,0.3)", flex: 1 }}>
        <SafeAreaView className="flex-1 px-8 mt-10">{children}</SafeAreaView>
      </View>
    </LinearGradient>
  );
};

export default LayoutScreen;
